import dotenv from 'dotenv';

dotenv.config();

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || '5555';
export const CLIENT_VERSION = process.env.CLIENT_VERSION || '1.0.0';

export const DB_NAME = process.env.DB_NAME || 'user_db';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'aaaa4321';
export const DB_HOST =
  process.env.DB_HOST || 'express-database.cngee4smsx66.ap-northeast-2.rds.amazonaws.com';
export const DB_PORT = process.env.DB_PORT || '3306';
