import { Component } from "@/utils/types";
import { PropsWithChildren, useEffect, useState } from "react";

function JustClient({ children }: PropsWithChildren): Component {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return <></>;

  return children;
}

export default JustClient;
