"use client";

import Loader from "@/components/Loader";
import React from "react";

const SearchLoading = () => {
  return (
    <div className="max-w-2xl mx-auto mt-24">
      <Loader />
    </div>
  );
};

export default SearchLoading;
