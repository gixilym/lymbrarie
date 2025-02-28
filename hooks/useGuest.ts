import { isNull } from "es-toolkit";
import { PAGES } from "@/utils/consts";
import { User, useUser } from "next-firebase-auth";

function useGuest(): { isGuest: boolean } {
  const user: User = useUser();
  const condition: boolean =
    window?.location?.pathname?.includes(PAGES.GUEST) || isNull(user.id);

  return { isGuest: condition };
}

export default useGuest;
