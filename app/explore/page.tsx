"use client";

import Categories from "@/components/Categories";
import React, { useState } from "react";

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("Autos");
  return (
    <div className="w-full">
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div>Exploring {activeCategory}</div>
    </div>
  );
};

export default Explore;
