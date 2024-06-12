import { Dispatch, SetStateAction, useState } from "react";

function useLoadContent(): LoadContent {
  const [isLoading, setIsLoading]: Load = useState<boolean>(false);
  const startLoading: Void = () => setIsLoading(true);
  const finishLoading: Void = () => setIsLoading(false);
  const uploadedContent: boolean = !isLoading;
  return { isLoading, uploadedContent, startLoading, finishLoading };
}

export default useLoadContent;

interface LoadContent {
  isLoading: boolean;
  startLoading: Void;
  finishLoading: Void;
  uploadedContent: boolean;
}

type Load = [boolean, Dispatch<SetStateAction<boolean>>];
export type Void = () => void;
