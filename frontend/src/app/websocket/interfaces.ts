export interface WSMessage {
  type: WSMessageType;
  payload: string;
}

export enum WSMessageType {
  USER_TYPING_START,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
}
