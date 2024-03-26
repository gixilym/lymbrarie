"use client";
import { useEffect, useState } from "react";

function SuccessLogIn({ active, email }: { active: boolean; email: string }) {
  const [handleActive, setHandleActive] = useState<boolean>(active);

  useEffect(() => {
    const timer = setTimeout(() => setHandleActive(false), 3000);
    return () => clearTimeout(timer);
  }, [handleActive]);

  return (
    handleActive && (
      <div
        role="alert"
        className="alert alert-success absolute top-0 right-0 w-max px-3 mt-5 mr-5 z-20"
      >
        <svg
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Sesión iniciada con: {email}</span>
      </div>
    )
  );
}

export default SuccessLogIn;
