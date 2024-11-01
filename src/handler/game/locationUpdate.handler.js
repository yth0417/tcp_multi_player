import { getGameSession } from '../../session/game.session.js';

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;
    const gameSession = getGameSession();

    if (!gameSession) {
      console.error('게임 세션을 찾을 수 없습니다.');
    }

    // console.log(gameSession);

    const user = gameSession.getUser(userId);
    if (!user) {
      console.error('사용자를 찾을 수 없습니다.');
    }
    user.updatePosition(x, y);

    const locationData = gameSession.getAllLocation(userId);

    socket.write(locationData);
  } catch (error) {
    console.error(error);
  }
};

export default locationUpdateHandler;
