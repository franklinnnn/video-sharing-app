import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div className="col-span-3 flex justify-center items-center w-full h-12  border-2 border-zinc-800 rounded-md ">
      <input
        placeholder="Search..."
        className="w-full h-full bg-zinc-900 py-1 px-2 rounded-l-md focus:outline-none"
      />
      <button className="flex justify-center items-center h-full px-4 text-slate-500 hover:text-slate-200 bg-zinc-800 transition">
        <BsSearch size={20} />
      </button>
    </div>
  );
};

export default Search;
