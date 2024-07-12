import { type Dispatch, type SetStateAction, useState } from "react";

function useLoadContent(): LoadContent {
  const [isLoading, setIsLoading]: Load = useState<boolean>(false);
  const startLoading: Void = () => setIsLoading(true);
  const finishLoading: Void = () => setIsLoading(false);
  return { isLoading, startLoading, finishLoading };
}

export default useLoadContent;

interface LoadContent {
  isLoading: boolean;
  startLoading: Void;
  finishLoading: Void;
}

type Load = [boolean, Dispatch<SetStateAction<boolean>>];
export type Void = () => void;
