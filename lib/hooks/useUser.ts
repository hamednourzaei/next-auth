"use client";

import { useSession } from "next-auth/react";

export function useUser() {
  const { data: session, status } = useSession();
  return {
    user: session?.user,
    status,
    isLoading: status === "loading",
    isAuthenticated: !!session?.user,
  };
}
