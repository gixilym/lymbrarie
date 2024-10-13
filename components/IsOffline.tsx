import type { Component } from "@/utils/types";
import { Wifi, WifiOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

function IsOffline(): Component {
  const [t] = useTranslation("global"),
    [isVisible, setIsVisible] = useState<boolean>(false),
    [isOffline, setIsOffline] = useState<boolean>(false),
    handleOnline = (): void => {
      setIsOffline(false);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    },
    handleOffline = (): void => {
      setIsOffline(true);
      setIsVisible(true);
    };

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    addEventListener("online", handleOnline);
    addEventListener("offline", handleOffline);

    return () => {
      removeEventListener("online", handleOnline);
      removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isVisible) return <></>;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end text-white p-4">
      <div
        className={twMerge(
          isOffline ? "bg-red-500/80" : "bg-green-500/80",
          "flex justify-center items-center p-4 rounded-xl gap-x-4"
        )}>
        <div className="flex items-center space-x-2">
          {isOffline ? (
            <>
              <WifiOff className="w-5 h-5" />
              <span className="text-sm font-medium">
                {t("notification-offline")}
              </span>
            </>
          ) : (
            <>
              <Wifi className="w-5 h-5" />
              <span className="text-sm font-medium">
                {t("notification-online")}
              </span>
            </>
          )}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-red-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default IsOffline;
