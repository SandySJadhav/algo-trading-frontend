"use client";

import Box from "@components/Box";
import Button from "@components/Button";
import CodeError from "@images/code_error.svg";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showErrors, setSetErrors] = useState(false);

  useEffect(() => {
    console.info(error);
  }, [error]);

  return (
    <div className="relative h-screen w-screen z-[1000] bg-white overflow-hidden">
      <div
        className={classNames(
          "flex flex-col h-screen w-screen left-0 top-0 justify-center items-center"
        )}
      >
        <h1 className="flex absolute top-20 font-extrabold text-4xl">
          500 - Internal Server Error
        </h1>
        <Image
          src={CodeError}
          alt="Code Error"
          className={classNames("flex", {
            "w-full max-w-[1300px]": !showErrors,
            "w-96": showErrors,
          })}
        />
        {showErrors && (
          <Box containerClass="max-h-[50%] min-h-[auto] max-w-[80%] lg:max-w-[60%]">
            <p className="text-master-pink">{error.message}</p>
            <p>{error.stack}</p>
          </Box>
        )}
        <div className="absolute flex bottom-0 w-screen justify-center items-center lg:h-32 h-60 space-x-7">
          <Button variant="primary" onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="danger" onClick={() => setSetErrors(!showErrors)}>
            {!showErrors ? "See" : "Hide"} details
          </Button>
        </div>
      </div>
    </div>
  );
}
