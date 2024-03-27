import Image from "next/image";
import Link from "next/link";

function Avatar({ image }: { image: string }) {
  return (
    <Link href="/settings" className="avatar">
      <div className="w-12 rounded cursor-pointer duration-100 hover:scale-95">
        <Image
          className="object-cover object-center brightness-90"
          width={50}
          height={50}
          src={image}
          alt="avatar"
        />
      </div>
    </Link>
  );
}

export default Avatar;
//<SuccessLogIn active email={session?.email} />
