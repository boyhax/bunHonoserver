import { client } from "@/App";
import { Session } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthStore = {
  session: Session | null;
  logout: () => void;
};
export const useAuth = create<AuthStore>()(
  persist(
    devtools(
      (set, get) => ({
        session: null,
        logout: () => {
          client.auth.signout();
        },
      }),
      { name: "auth" }
    ),
    { name: "auth-store" }
  )
);
