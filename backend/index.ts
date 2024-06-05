import cors = require("cors");
import express = require("express");
import { Pool } from "pg";
import dotenv = require("dotenv");
import { Request, Response, NextFunction } from "express";

dotenv.config();

const pool = new Pool ({
  connectionString: process.env.DATABASE_URL
})

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/day/:dayId', async (req: Request, res: Response) => {
  const requestDay = req.params.dayId;
  const query = `
    SELECT d.day_number,
      ARRAY_AGG(DISTINCT w.exercises) AS warmup,
      ARRAY_AGG(DISTINCT s.exercises) AS strength,
      ARRAY_AGG(DISTINCT wc.exercises) AS workout_cardio,
      ARRAY_AGG(DISTINCT a.exercises) AS accessory,
      ARRAY_AGG(DISTINCT b.exercises) AS bonus
    FROM day d
    LEFT JOIN warmup w ON d.id = w.day_id
    LEFT JOIN strength s ON d.id = s.day_id
    LEFT JOIN workout_cardio wc ON d.id = wc.day_id
    LEFT JOIN accessory a ON d.id = a.day_id
    LEFT JOIN bonus b ON d.id = b.day_id
    WHERE d.day_number = $1
    GROUP BY d.day_number;
  `;

  try {
    const { rows } = await pool.query(query, [requestDay]);
    if (!rows.length) {
      return res.status(404).json({ message: 'No info found for this day' });
    }
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while trying to fetch day' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port localhost:${port}`);
});
