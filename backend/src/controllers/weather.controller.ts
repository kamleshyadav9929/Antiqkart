import { Request, Response } from 'express';
import axios from 'axios';
import { query } from '../utils/db';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const CACHE_DURATION = 3600; // 1 hour in seconds

export const getWeather = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lon, location } = req.query;
    
    if (!lat || !lon) {
      res.status(400).json({ error: 'Latitude and longitude are required' });
      return;
    }
    
    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lon as string);
    
    // Check cache first
    const cacheResult = await query(
      `SELECT * FROM weather_cache
       WHERE lat = $1 AND lon = $2
         AND updated_at > NOW() - INTERVAL '1 hour'
       LIMIT 1`,
      [latitude, longitude]
    );
    
    if (cacheResult.rows.length > 0) {
      res.json({
        success: true,
        data: cacheResult.rows[0].payload,
        cached: true,
      });
      return;
    }
    
    // Fetch from API
    if (!WEATHER_API_KEY) {
      res.status(503).json({ error: 'Weather service not configured' });
      return;
    }
    
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`${WEATHER_API_URL}/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: WEATHER_API_KEY,
          units: 'metric',
          lang: 'en',
        },
      }),
      axios.get(`${WEATHER_API_URL}/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: WEATHER_API_KEY,
          units: 'metric',
          lang: 'en',
        },
      }),
    ]);
    
    const weatherData = {
      current: {
        temp: currentResponse.data.main.temp,
        feels_like: currentResponse.data.main.feels_like,
        humidity: currentResponse.data.main.humidity,
        pressure: currentResponse.data.main.pressure,
        description: currentResponse.data.weather[0].description,
        icon: currentResponse.data.weather[0].icon,
        wind_speed: currentResponse.data.wind.speed,
        clouds: currentResponse.data.clouds.all,
      },
      forecast: forecastResponse.data.list.slice(0, 8).map((item: any) => ({
        dt: item.dt,
        temp: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
      })),
      location: {
        name: location || currentResponse.data.name,
        lat: latitude,
        lon: longitude,
      },
    };
    
    // Store in cache
    await query(
      `INSERT INTO weather_cache (location_name, lat, lon, payload, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (lat, lon)
       DO UPDATE SET payload = $4, updated_at = NOW()`,
      [location || currentResponse.data.name, latitude, longitude, JSON.stringify(weatherData)]
    );
    
    res.json({
      success: true,
      data: weatherData,
      cached: false,
    });
  } catch (error: any) {
    console.error('Error fetching weather:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
