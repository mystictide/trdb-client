const charset = "abcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = () => {
  let text = "";
  for (var i = 0; i <= 16; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
};

export const authCreds = {
  client_id: "dfc635c345264e2cbff9075a5bc6d6c9",
  redirect_uri: "http://localhost:3000/",
  auth_endpoint: "https://accounts.spotify.com/authorize",
  response_type: "token",
  state: generateRandomString(),
  scope: "user-read-private user-follow-read user-top-read playlist-read-private",
};
