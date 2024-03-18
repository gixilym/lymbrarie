import Link from "next/link";

function HeaderMain({ session }: any) {
  if (typeof session == null) {
    return (
      <header className="w-full bg-transparent pt-10 flex justify-start items-center gap-20">
        <Link
          href="/api/auth/signin"
          className=" cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
            border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Log In
        </Link>
      </header>
    );
  }
}

export default HeaderMain;
