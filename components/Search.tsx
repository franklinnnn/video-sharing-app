"use client";

import React, { useState } from "react";
import SearchButton from "./SearchButton";

const Search = () => {
  const [input, setInput] = useState("");
  return (
    <div className="col-span-2 flex justify-center items-center w-full h-12  border-2 border-primary/20 rounded-md focus-within:border-primary dark:border-zinc-900 focus-within:dark:border-zinc-200 transition">
      <input
        placeholder="Search..."
        className="w-full h-full py-1 px-2 rounded-l-md focus:outline-none peer dark:bg-zinc-900"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <SearchButton input={input} />
    </div>
  );
};

export default Search;
