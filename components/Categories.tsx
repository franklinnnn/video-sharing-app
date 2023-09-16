import React, { Dispatch, SetStateAction } from "react";
import { AiFillCar } from "react-icons/ai";
import { PiFilmReelFill } from "react-icons/pi";
import { MdSportsBasketball } from "react-icons/md";
import { BsHandbagFill } from "react-icons/bs";
import { FaMusic } from "react-icons/fa";
import { CategoriesProps } from "@/types";

const Categories = ({ activeCategory, setActiveCategory }: CategoriesProps) => {
  const categories = [
    {
      label: "Autos",
      icon: <AiFillCar />,
      id: 1,
    },
    {
      label: "Film",
      icon: <PiFilmReelFill />,
      id: 2,
    },
    {
      label: "Sports",
      icon: <MdSportsBasketball />,
      id: 3,
    },
    {
      label: "Fashion",
      icon: <BsHandbagFill />,
      id: 4,
    },
    {
      label: "Music",
      icon: <FaMusic />,
      id: 5,
    },
  ];
  return (
    <div className="flex flex-row gap-4 justify-start items-center w-full py-2 overflow-x-scroll scrollbar">
      {categories.map((item) => (
        <button
          key={item.id}
          className="flex justify-center items-center gap-4 text-md text-primary bg-gray-1/50 hover:bg-gray-1 rounded-md transition py-1 px-4 "
          onClick={() => setActiveCategory(item.label)}
        >
          {item.icon} {item.label}
        </button>
      ))}
    </div>
  );
};

export default Categories;
