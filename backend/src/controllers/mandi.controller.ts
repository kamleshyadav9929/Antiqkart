import { Request, Response } from 'express';
import { query } from '../utils/db';

export const getMandiPrices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state, crop, mandi, date, limit = 100, offset = 0 } = req.query;
    
    let queryText = `
      SELECT * FROM mandi_prices
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 1;
    
    if (state) {
      queryText += ` AND state ILIKE $${paramCount}`;
      params.push(`%${state}%`);
      paramCount++;
    }
    
    if (crop) {
      queryText += ` AND crop ILIKE $${paramCount}`;
      params.push(`%${crop}%`);
      paramCount++;
    }
    
    if (mandi) {
      queryText += ` AND mandi_name ILIKE $${paramCount}`;
      params.push(`%${mandi}%`);
      paramCount++;
    }
    
    if (date) {
      queryText += ` AND date = $${paramCount}`;
      params.push(date);
      paramCount++;
    }
    
    queryText += ` ORDER BY date DESC, state, mandi_name, crop`;
    queryText += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit as string), parseInt(offset as string));
    
    const result = await query(queryText, params);
    
    // Get total count
    let countQuery = `SELECT COUNT(*) FROM mandi_prices WHERE 1=1`;
    const countParams: any[] = [];
    let countParamNum = 1;
    
    if (state) {
      countQuery += ` AND state ILIKE $${countParamNum}`;
      countParams.push(`%${state}%`);
      countParamNum++;
    }
    if (crop) {
      countQuery += ` AND crop ILIKE $${countParamNum}`;
      countParams.push(`%${crop}%`);
      countParamNum++;
    }
    if (mandi) {
      countQuery += ` AND mandi_name ILIKE $${countParamNum}`;
      countParams.push(`%${mandi}%`);
      countParamNum++;
    }
    if (date) {
      countQuery += ` AND date = $${countParamNum}`;
      countParams.push(date);
    }
    
    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);
    
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        hasMore: parseInt(offset as string) + result.rows.length < total,
      },
    });
  } catch (error) {
    console.error('Error fetching mandi prices:', error);
    res.status(500).json({ error: 'Failed to fetch mandi prices' });
  }
};

export const getMandiPriceHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state, crop, mandi, days = 30 } = req.query;
    
    if (!state || !crop) {
      res.status(400).json({ error: 'State and crop are required' });
      return;
    }
    
    let queryText = `
      SELECT * FROM mandi_prices
      WHERE state ILIKE $1
        AND crop ILIKE $2
        AND date >= CURRENT_DATE - INTERVAL '${parseInt(days as string)} days'
    `;
    const params: any[] = [`%${state}%`, `%${crop}%`];
    
    if (mandi) {
      queryText += ` AND mandi_name ILIKE $3`;
      params.push(`%${mandi}%`);
    }
    
    queryText += ` ORDER BY date DESC, mandi_name`;
    
    const result = await query(queryText, params);
    
    res.json({
      success: true,
      data: result.rows,
      period: {
        days: parseInt(days as string),
        from: result.rows[result.rows.length - 1]?.date,
        to: result.rows[0]?.date,
      },
    });
  } catch (error) {
    console.error('Error fetching mandi price history:', error);
    res.status(500).json({ error: 'Failed to fetch price history' });
  }
};

export const getStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query(
      `SELECT DISTINCT state FROM mandi_prices WHERE state IS NOT NULL ORDER BY state`
    );
    
    res.json({
      success: true,
      data: result.rows.map(row => row.state),
    });
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ error: 'Failed to fetch states' });
  }
};

export const getCrops = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state } = req.query;
    
    let queryText = `SELECT DISTINCT crop FROM mandi_prices WHERE crop IS NOT NULL`;
    const params: any[] = [];
    
    if (state) {
      queryText += ` AND state ILIKE $1`;
      params.push(`%${state}%`);
    }
    
    queryText += ` ORDER BY crop`;
    
    const result = await query(queryText, params);
    
    res.json({
      success: true,
      data: result.rows.map(row => row.crop),
    });
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
};

export const getMandis = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state } = req.query;
    
    let queryText = `SELECT DISTINCT mandi_name FROM mandi_prices WHERE mandi_name IS NOT NULL`;
    const params: any[] = [];
    
    if (state) {
      queryText += ` AND state ILIKE $1`;
      params.push(`%${state}%`);
    }
    
    queryText += ` ORDER BY mandi_name`;
    
    const result = await query(queryText, params);
    
    res.json({
      success: true,
      data: result.rows.map(row => row.mandi_name),
    });
  } catch (error) {
    console.error('Error fetching mandis:', error);
    res.status(500).json({ error: 'Failed to fetch mandis' });
  }
};
