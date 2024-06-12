import { getSession } from "next-auth/react";
import { Session, Email } from "../types";
import { useEffect, useState } from "react";

function useUserEmail() {
  const [userEmail, setUserEmail] = useState<Email>(null);

  useEffect(() => {
    (async function () {
      const session: Session = await getSession();
      const email = session?.user?.email;
      setUserEmail(email);
    })();
  }, []);

  return { userEmail };
}

export default useUserEmail;
