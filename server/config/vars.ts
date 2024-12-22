export const secret = process.env.JWT_SECRET;
export const redirect_uri = process.env.REDIRECT_URI;
export const vars = {
  oauthRedirectUrls: [
    "http://localhost:8080/auth/google/callback",
    "http://localhost:5173/auth/google-callback",
    redirect_uri,
  ],

  jwt_secret: process.env.JWT_SECRET,
};
