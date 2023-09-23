"use client";

import React, { useState } from "react";
import SearchButton from "./SearchButton";

const Search = () => {
  const [input, setInput] = useState("");
  return (
    <div className="col-span-3 flex justify-center items-center w-full h-12  border-2 border-gray-1 rounded-md focus-within:border-primary transition">
      <input
        placeholder="Search..."
        className="w-full h-full py-1 px-2 rounded-l-md focus:outline-none peer"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <SearchButton input={input} />
    </div>
  );
};

export default Search;
