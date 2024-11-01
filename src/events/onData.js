import { packetParser } from '../utils/parser/packetParser.js';
import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js';
import { getHandlerById } from '../handler/index.js';
import { getProtoMessages } from '../init/loadProtos.js';
import { getUserBySocket } from '../session/user.session.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

  while (socket.buffer.length > totalHeaderLength) {
    // 1. 패킷 길이 정보 수신 (4바이트)
    const length = socket.buffer.readUInt32BE(0);

    // 2. 패킷 타입 정보 수신 (1바이트)
    const packetType = socket.buffer.readUInt8(TOTAL_LENGTH);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.subarray(totalHeaderLength, length);
      socket.buffer = socket.buffer.subarray(length);

      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            {
              const protoMessages = getProtoMessages();
              const Ping = protoMessages.common.Ping;
              const pingPacket = Ping.decode(packet);
              const user = getUserBySocket(socket);
              user.handlePong(pingPacket);
            }
            break;
          case PACKET_TYPE.NORMAL: {
            // 패킷 파서
            const { handlerId, userId, payload } = packetParser(packet);
            const handler = getHandlerById(handlerId);
            await handler({
              socket,
              userId,
              payload,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      break;
    }
  }
};
