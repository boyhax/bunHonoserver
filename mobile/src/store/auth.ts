import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
export type Session = {
  token: string;
  user: {
    name: string;
  };
};
type AuthStore = {
  session: Session | null;
};
export const useAuth = create<AuthStore>()(
  persist(
    devtools(
      () => ({
        session: null,
      }),
      { name: "auth" }
    ),
    { name: "auth-store" }
  )
);
