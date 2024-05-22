"use client";

import moment from "moment";
import { useEffect, useState } from "react";

export default ({ content }: { content: string }) => {
  const [clock, setClock] = useState<string>("");

  useEffect(() => {
    const newClock = moment().format("HH:mm:ss");
    setClock(newClock);
    setInterval(() => {
      const newClock = moment().format("HH:mm:ss");
      setClock(newClock);
    }, 1000);
  }, []);

  return (
    <div className="border-b border-black p-4 flex flex-row items-center text-xl font-bold">
      <h1 className=" grow">{content}</h1>
      <span>{clock}</span>
    </div>
  );
};
