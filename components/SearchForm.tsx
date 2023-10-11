"use client";
import { getSearchPosts, getSearchUsers } from "@/utils/getSearchResults";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchFormProps } from "@/types";
import { BsSearch } from "react-icons/bs";

const SearchForm = ({ setPosts, setUsers, setLoading }: SearchFormProps) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [query] = useDebounce(input, 500);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPosts([] as any);
    setUsers([] as any);
    setTimeout(() => {
      getSearchPosts(input).then(setPosts);
      getSearchUsers(input).then(setUsers);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!query) {
      router.push(`/search`);
    } else {
      router.push(`/search?q=${query}`);
    }
  }, [query, router]);

  return (
    <form
      onSubmit={handleSearch}
      className="col-span-2 flex justify-center items-center w-full h-12 border-2 border-primary/20 rounded-md focus-within:border-primary dark:border-zinc-200/20 focus-within:dark:border-zinc-200 transition"
    >
      <input
        placeholder="Search..."
        className="w-full h-full py-1 px-2 rounded-l-md focus:outline-none peer dark:bg-zinc-900"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        type="submit"
        className="flex justify-center items-center h-full px-4 text-primary/20 dark:text-zinc-800 transition peer-focus:text-primary peer-focus:dark:text-zinc-200 dark:bg-zinc-900 rounded-r-md"
      >
        <BsSearch size={20} />
      </button>
    </form>
  );
};

export default SearchForm;
