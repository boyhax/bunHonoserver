import { client } from "@/App";
import getPromise from "@/lib/getpromise";
import { useMutation } from "@tanstack/react-query";

export async function updateProfile(profile: {
  name: string;
  avatar: string;
}): Promise<void> {
  const { data, error } = await getPromise(client.update("/account", profile));
  if (error) {
    throw new Error("Failed to update profile", error);
  }
  return data;
}

export function useUpdateProfile() {
  return useMutation({
    mutationKey: ["accountupdate"],
    mutationFn: updateProfile,
  });
}
