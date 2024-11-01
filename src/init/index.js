import { loadProtos } from './loadProtos.js';
import { addGameSession } from '../session/game.session.js';
import { v4 as uuidv4 } from 'uuid';
import { testConnection } from '../utils/db/testConnection.js';

const initServer = async () => {
  try {
    await loadProtos();
    const gameId = uuidv4();
    const gameSession = addGameSession(gameId);
    console.log(gameSession);
    await testConnection();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default initServer;
