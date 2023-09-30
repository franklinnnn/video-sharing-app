import { SearchButtonProps } from "@/types";
import { db } from "@/utils/firebase";
import { and, collection, getDocs, or, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchButton = ({ input }: SearchButtonProps) => {
  const [postResults, setPostResults] = useState([] as any);
  const [usernameResults, setUsernameResults] = useState([] as any);
  const [displayNameResults, setDisplayNameResults] = useState([] as any);
  const [userResults, setUserResults] = useState([] as any);

  const router = useRouter();
  const handleSearch = async () => {
    try {
      const postsRef = collection(db, "posts");
      const usersRef = collection(db, "users");

      const postsQuery = query(
        postsRef,
        or(
          and(
            where("caption", ">=", input),
            where("caption", "<=", input + "\uf7ff")
          ),
          and(
            where(
              "caption",
              ">=",
              input.charAt(0).toUpperCase() + input.slice(1)
            ),
            where(
              "caption",
              "<=",
              input.charAt(0).toUpperCase() + input.slice(1) + "\uf7ff"
            )
          ),
          and(
            where("caption", ">=", input.toLowerCase()),
            where("caption", "<=", input.toLowerCase() + "\uf7ff")
          )
        )
      );

      const usersUsernameQuery = query(
        usersRef,
        or(
          and(
            where("username", ">=", input),
            where("username", "<=", input + "\uf7ff")
          ),
          and(
            where(
              "username",
              ">=",
              input.charAt(0).toUpperCase() + input.slice(1)
            ),
            where(
              "username",
              "<=",
              input.charAt(0).toUpperCase() + input.slice(1) + "\uf7ff"
            )
          ),
          and(
            where("username", ">=", input.toLowerCase()),
            where("username", "<=", input.toLowerCase() + "\uf7ff")
          )
        )
      );
      const usersDisplayNameQuery = query(
        usersRef,
        or(
          and(
            where("displayName", ">=", input),
            where("displayName", "<=", input + "\uf7ff")
          ),
          and(
            where(
              "displayName",
              ">=",
              input.charAt(0).toUpperCase() + input.slice(1)
            ),
            where(
              "displayName",
              "<=",
              input.charAt(0).toUpperCase() + input.slice(1) + "\uf7ff"
            )
          ),
          and(
            where("displayName", ">=", input.toLowerCase()),
            where("displayName", "<=", input.toLowerCase() + "\uf7ff")
          )
        )
      );

      const postsSnapshot = await getDocs(postsQuery);
      postsSnapshot.forEach((post) => {
        // console.log(post.id, "=>", post.data());
        setPostResults(post.data());
      });
      const usersUsernameSnapshot = await getDocs(usersUsernameQuery);
      usersUsernameSnapshot.forEach((user) => {
        // console.log(user.id, "=>", user.data());
        setUsernameResults(user.data());
      });
      const usersDisplayNameSnapshot = await getDocs(usersDisplayNameQuery);
      usersDisplayNameSnapshot.forEach((user) => {
        // console.log(user.id, "=>", user.data());
        setDisplayNameResults(user.data());
      });

      console.log(postResults);
      console.log(usernameResults);
      console.log(displayNameResults);
      // console.log("posts", postResults, "users", userResults);

      router.push(`/search?q=${input}`);
    } catch (error) {
      console.log(error);
    }
    console.log("did it work?");
  };
  return (
    <button
      disabled={!input}
      onClick={handleSearch}
      className="flex justify-center items-center h-full px-4 text-primary/20 transition peer-focus:text-primary"
    >
      <BsSearch size={20} />
    </button>
  );
};

export default SearchButton;
