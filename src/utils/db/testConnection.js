import dbpool from '../../db/database.js';

const testConnection = async (pool) => {
  try {
    const [rows] = await dbpool.query('SELECT 1 + 1 AS solution');
    console.log(`테스트 쿼리 결과:`, rows[0].solution);
  } catch (error) {
    console.error(`테스트 쿼리 실행 중 오류:`, error);
  }
};

export { testConnection };
