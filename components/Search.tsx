import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div className="group col-span-3 flex justify-center items-center w-full h-12  border-2 border-gray-1 rounded-md group-hover:border-primary">
      <input
        placeholder="Search..."
        className="w-full h-full py-1 px-2 rounded-l-md focus:outline-none"
      />
      <button className="flex justify-center items-center h-full px-4 text-gray-2 hover:text-zinc-500 transition">
        <BsSearch size={20} />
      </button>
    </div>
  );
};

export default Search;
