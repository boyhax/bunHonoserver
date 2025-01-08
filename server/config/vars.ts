export const secret = process.env.JWT_SECRET;
export const redirect_uri = process.env.REDIRECT_URI as string;

export const vars = {
  oauthRedirectUrls: [
    "http://localhost:8080/auth/google/callback",
    "http://localhost:5173/auth/google-callback",
  ],

  jwt_secret: process.env.JWT_SECRET as string,
};
if (redirect_uri && redirect_uri?.trim().split(",").length > 0) {
  vars.oauthRedirectUrls = redirect_uri.trim().split(",");
}
