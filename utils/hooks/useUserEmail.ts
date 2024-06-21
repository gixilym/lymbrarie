import { getSession } from "next-auth/react";
import { Session, Email } from "../types";
import { useEffect, useState } from "react";
import useSessionExists from "./useSessionExists";

function useUserEmail() {
  const [userEmail, setUserEmail] = useState<Email>(null);
  const { userLoggedIn } = useSessionExists();

  useEffect(() => {
    (async function () {
      const session: Session = await getSession();
      const email: string | null | undefined = session?.user?.email;
      setUserEmail(email);
    })();
  }, [userLoggedIn]);

  return { userEmail };
}

export default useUserEmail;
