import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import Image from "next/image";
// import SuccessLogIn from "./SuccessLogIn";

function HeaderMain({ session }: any) {
  return (
    <header className="w-full bg-transparent pt-10 flex justify-between items-center">
      {session == null ? (
        <Link
          href="/api/auth/signin"
          className=" cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
            border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:scale-95 hover:outline-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Iniciar sesión
        </Link>
      ) : (
        <>
          <Link href="/settings" className="avatar">
            <div className="w-12 rounded cursor-pointer duration-100 hover:scale-95">
              <Image
                className="object-cover object-center brightness-90"
                width={50}
                height={50}
                src={session?.image}
                alt="avatar"
              />
            </div>
          </Link>
          {/* <SuccessLogIn active email={session?.email} /> */}
        </>
      )}
      <p className="text-xl font-public text-white/70 tracking-wide">
        Lymbrarie
      </p>
      <ToggleTheme />
    </header>
  );
}

export default HeaderMain;
