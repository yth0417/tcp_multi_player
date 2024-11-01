import { getProtoMessages } from '../../init/loadProtos.js';
import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../../constants/header.js';

export const createResponse = (handlerId, responseCode, data = null) => {
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  const response = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
  };

  const buffer = Response.encode(response).finish();

  // 패킷 길이 정보를 포함한 버퍼 생성
  const packetLength = Buffer.alloc(TOTAL_LENGTH);
  packetLength.writeUInt32BE(buffer.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0); // 패킷 길이에 타입 바이트 포함

  // 패킷 타입 정보를 포함한 버퍼 생성
  const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
  packetType.writeUInt8(PACKET_TYPE.NORMAL, 0);

  // 길이 정보와 메시지를 함께 전송
  return Buffer.concat([packetLength, packetType, buffer]);
};
