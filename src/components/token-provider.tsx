"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { getAccessToken, setAccessToken } from "@/lib/utils";

const TokenProvider = () => {
  const { data: session } = useSession();

  React.useEffect(() => {
    // console.log(session);
    const token = getAccessToken();
    if (session?.user?.token && session.user.token !== token)
      setAccessToken(session.user.token);
  }, [session?.user?.token]);

  return null;
};

export default TokenProvider;
