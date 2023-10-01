"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  const { currentUser } = useCurrentUser();

  // console.log(currentUser);

  return <section>{JSON.stringify(currentUser)}</section>;
};

export default Search;
