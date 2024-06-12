import { getSession } from "next-auth/react";
import { Session } from "../types";
import { useEffect, useState } from "react";

function useSessionExists() {
  const [session, setSession] = useState<Session | "">("");

  useEffect(() => {
    (async function () {
      const mySession: Session = await getSession();
      setSession(mySession);
    })();
  }, []);

  //El string vacío es para que no aparezca por 1 segundo el btn para loguerse al cambiar de ruta.
  const userLoggedIn: boolean = session == "" ? true : session != null;
  const userNotLoggedIn: boolean = session == null;
  return { userLoggedIn, userNotLoggedIn };
}

export default useSessionExists;
