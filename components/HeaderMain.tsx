import Avatar from "./Avatar";
import LogInBtn from "./LogInBtn";
import Title from "./Title";
import ToggleTheme from "./ToggleTheme";
import DialogModal from "./DialogModal";

function HeaderMain({ session }: any) {
  const sessionExists = session != null;

  return (
    <header className="w-full bg-transparent pt-10 flex justify-between items-center">
      {sessionExists ? <Avatar image={session?.image} /> : <LogInBtn />}
      <Title />
      <ToggleTheme />
      <DialogModal />
    </header>
  );
}

export default HeaderMain;
