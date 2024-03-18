import AddForm from "@/components/AddForm";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

function AddBook({ session }: any) {
  return (
    <section className=" w-[550px] bg-white rounded-lg flex justify-start items-center">
      <AddForm session={session} />
    </section>
  );
}

export default AddBook;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const SESSION = await getSession(ctx);
  return {
    props: {
      session: SESSION?.user ?? null,
    },
  };
}
