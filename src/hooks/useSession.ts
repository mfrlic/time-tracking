import { getSession } from "@/app/api/client";
import type { Session } from "@/app/api/types";
import { useEffect, useState } from "react";

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!session) {
      getSession().then((s) => {
        setSession(s);
      });
    }
  }, [session]);

  return { session };
}
