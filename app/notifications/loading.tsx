import React from "react";

const NotifictionsLoading = () => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 5 }, (item, i) => (
        <div key={i} className="flex gap-6 items-start py-4 w-[560px] h-[90px]">
          <div className="flex gap-2 items-center w-full ml-12 pl-2">
            <div className="object-fit rounded-full h-10 w-10 bg-primary/30 dark:bg-zinc-200/30" />
            <div className="font-bold hover:underline hover:cursor-pointer ml-2 w-44 h-6 rounded-md bg-primary/30 dark:bg-zinc-200/30" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotifictionsLoading;
