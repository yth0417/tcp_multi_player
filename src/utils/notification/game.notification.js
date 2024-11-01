import { getProtoMessages } from '../../init/loadProtos.js';
import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from './../../constants/header.js';

const serializer = (message, type) => {
  // 패킷 길이 정보를 포함한 버퍼 생성
  const packetLength = Buffer.alloc(TOTAL_LENGTH);
  packetLength.writeUInt32BE(message.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0); // 패킷 길이에 타입 바이트 포함

  // 패킷 타입 정보를 포함한 버퍼 생성
  const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
  packetType.writeUInt8(type, 0);

  // 길이 정보와 메시지를 함께 전송
  return Buffer.concat([packetLength, packetType, message]);
};

export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const Location = protoMessages.gameNotification.LocationUpdate;

  const payload = { users };
  const message = Location.create(payload);
  const locationPacket = Location.encode(message).finish();
  return serializer(locationPacket, PACKET_TYPE.LOCATION);
};

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();
  const ping = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);
  const pingPacket = ping.encode(message).finish();
  return serializer(pingPacket, PACKET_TYPE.PING);
};
