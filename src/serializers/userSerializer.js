export function serializeUser(user) {
  return {
    id: user.id,
    username: user.username,
  };
}
