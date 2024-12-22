import { vars } from "./vars";

export function validRedirect(redirect: string) {
  return vars.oauthRedirectUrls.includes(redirect);
}
