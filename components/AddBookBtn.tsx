"use client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AddBookBtn() {
  type SessionType = Session | null;
  const router = useRouter();
  const [session, setSession] = useState<SessionType>(null);

  useEffect(() => {
    (async function () {
      const mySession: SessionType = await getSession();
      setSession(mySession);
    })();
  }, []);

  function goTo() {
    const modal: any = document?.getElementById("add_book");
    return session == null
      ? router.push("/api/auth/signin")
      : modal.showModal();
  }

  return (
    <button
      onClick={goTo}
      type="button"
      className="btn font-normal font-public backdrop-blur-[2px] h-14 last:group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500  border-2 border-rose-300/40 hover:border-rose-300/60 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-5 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 text-rose-300 relative bg-slate-800/60 w-60 flex justify-start items-center px-3 text-lg rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-14 after:h-20 after:content[''] after:bg-rose-400 after:right-10 after:top-3 after:rounded-full after:blur-lg"
    >
      Añade un libro
    </button>
  );
}

export default AddBookBtn;
