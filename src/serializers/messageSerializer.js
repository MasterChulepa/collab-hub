import { serializeUser } from "./userSerializer.js";

export function serializeMessage(message) {
  const result = {
    id: message.id,
    content: message.content,
    created_at: message.created_at,
  };

  if (message.user) {
    result.user = serializeUser(message.user);
  }

  return result;
}
