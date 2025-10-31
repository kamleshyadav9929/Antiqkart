import { Request, Response } from 'express';
import { query } from '../utils/db';

export const getSchemes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state, category, verified, limit = 50, offset = 0 } = req.query;
    
    let queryText = `SELECT * FROM items WHERE 1=1`;
    const params: any[] = [];
    let paramCount = 1;
    
    if (state && state !== 'All India') {
      queryText += ` AND (state ILIKE $${paramCount} OR state = 'All India')`;
      params.push(`%${state}%`);
      paramCount++;
    }
    
    if (category) {
      queryText += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }
    
    if (verified !== undefined) {
      queryText += ` AND verified = $${paramCount}`;
      params.push(verified === 'true');
      paramCount++;
    }
    
    queryText += ` ORDER BY event_date DESC NULLS LAST, created_at DESC`;
    queryText += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit as string), parseInt(offset as string));
    
    const result = await query(queryText, params);
    
    // Get total count
    let countQuery = `SELECT COUNT(*) FROM items WHERE 1=1`;
    const countParams: any[] = [];
    let countParamNum = 1;
    
    if (state && state !== 'All India') {
      countQuery += ` AND (state ILIKE $${countParamNum} OR state = 'All India')`;
      countParams.push(`%${state}%`);
      countParamNum++;
    }
    if (category) {
      countQuery += ` AND category = $${countParamNum}`;
      countParams.push(category);
      countParamNum++;
    }
    if (verified !== undefined) {
      countQuery += ` AND verified = $${countParamNum}`;
      countParams.push(verified === 'true');
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
    console.error('Error fetching schemes:', error);
    res.status(500).json({ error: 'Failed to fetch schemes' });
  }
};

export const getSchemeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const result = await query('SELECT * FROM items WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Scheme not found' });
      return;
    }
    
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching scheme:', error);
    res.status(500).json({ error: 'Failed to fetch scheme' });
  }
};
