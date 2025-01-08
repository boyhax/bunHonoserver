// import { Api } from "server";

const apiUrl = import.meta.env.VITE_APP_API_URL as string;
console.log("object :>> ", apiUrl);
export function apiurl() {
  return apiUrl;
}

// export const api = Api(apiurl());
// api.api.products.$get({ query: {} }).then((res) => {
//   console.log(res);
// });
