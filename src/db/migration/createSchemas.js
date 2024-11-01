import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbpool from '../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createSchemas = async () => {
  const sqlDir = path.join(__dirname, '../sql');

  try {
    const sql = fs.readFileSync(sqlDir + '/user_db.sql', 'utf8');

    const queries = sql
      .split(';')
      .map((query) => query.trim())
      .filter((query) => query.length > 0);

    for (const query of queries) {
      await dbpool.query(query);
    }

    console.log('데이터베이스 테이블이 성공적으로 생성되었습니다.');
  } catch (error) {
    console.error('데이터베이스 마이그레이션 에러!:', error);
  }
};

createSchemas()
  .then(() => {
    console.log('마이그레이션이 완료되었습니다.');
    process.exit(0); // 마이그레이션 완료 후 프로세스 종료
  })
  .catch((error) => {
    console.error('마이그레이션 중 오류가 발생했습니다:', error);
    process.exit(1); // 오류 발생 시 프로세스 종료
  });
