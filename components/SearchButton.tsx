import useSearch from "@/hooks/useSearch";
import { SearchButtonProps } from "@/types";
import { db } from "@/utils/firebase";
import { and, collection, getDocs, or, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsSearch } from "react-icons/bs";

const SearchButton = ({ input }: SearchButtonProps) => {
  const [postResults, setPostResults] = useState([] as any);
  const [usernameResults, setUsernameResults] = useState([] as any);
  const [displayNameResults, setDisplayNameResults] = useState([] as any);
  const [userResults, setUserResults] = useState([] as any);

  const router = useRouter();

  const postQuery = query(collection(db, "posts"));
  const [posts] = useCollectionData(postQuery);
  const userQuery = query(collection(db, "users"));
  const [users] = useCollectionData(userQuery);

  const handleSearch = async () => {
    const postsFilter = posts?.filter((post) =>
      post.caption.toLowerCase().includes(input)
    );

    // console.log(postResults.length, userResults.length);
    // try {
    //   const filteredPosts = posts?.filter((post) => {
    //     return post.caption.toLowerCase().includes(input);
    //   });
    //   setPostResults(filteredPosts);
    //   const filteredUsernames = users?.filter((user) => {
    //     const username = user.username.toLowerCase().includes(input);
    //     return username;
    //   });
    //   setUsernameResults(filteredUsernames);
    //   const filteredDisplayNames = users?.filter((user) => {
    //     return user.displayName.toLowerCase().includes(input);
    //   });
    //   setDisplayNameResults(filteredDisplayNames);
    //   console.log("posts", postResults);
    //   console.log("usernames", usernameResults);
    //   console.log("display names", displayNameResults);
    //   console.log("users", userResults);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // const handleSearch = async () => {
  //   try {
  //     const postsRef = collection(db, "posts");
  //     const usersRef = collection(db, "users");

  //     const postsQuery = query(
  //       postsRef,
  //       or(
  //         and(
  //           where("caption", ">=", input),
  //           where("caption", "<=", input + "\uf7ff")
  //         ),
  //         and(
  //           where(
  //             "caption",
  //             ">=",
  //             input.charAt(0).toUpperCase() + input.slice(1)
  //           ),
  //           where(
  //             "caption",
  //             "<=",
  //             input.charAt(0).toUpperCase() + input.slice(1) + "\uf7ff"
  //           )
  //         ),
  //         and(
  //           where("caption", ">=", input.toLowerCase()),
  //           where("caption", "<=", input.toLowerCase() + "\uf7ff")
  //         )
  //       )
  //     );

  //     const usersUsernameQuery = query(
  //       usersRef,
  //       or(
  //         and(
  //           where("username", ">=", input),
  //           where("username", "<=", input + "\uf7ff")
  //         ),
  //         and(
  //           where(
  //             "username",
  //             ">=",
  //             input.charAt(0).toUpperCase() + input.slice(1)
  //           ),
  //           where(
  //             "username",
  //             "<=",
  //             input.charAt(0).toUpperCase() + input.slice(1) + "\uf7ff"
  //           )
  //         ),
  //         and(
  //           where("username", ">=", input.toLowerCase()),
  //           where("username", "<=", input.toLowerCase() + "\uf7ff")
  //         )
  //       )
  //     );
  //     const usersDisplayNameQuery = query(
  //       usersRef,
  //       or(
  //         and(
  //           where("displayName", ">=", input),
  //           where("displayName", "<=", input + "\uf7ff")
  //         ),
  //         and(
  //           where(
  //             "displayName",
  //             ">=",
  //             input.charAt(0).toUpperCase() + input.slice(1)
  //           ),
  //           where(
  //             "displayName",
  //             "<=",
  //             input.charAt(0).toUpperCase() + input.slice(1) + "\uf7ff"
  //           )
  //         ),
  //         and(
  //           where("displayName", ">=", input.toLowerCase()),
  //           where("displayName", "<=", input.toLowerCase() + "\uf7ff")
  //         )
  //       )
  //     );

  //     const postsSnapshot = await getDocs(postsQuery);
  //     postsSnapshot.docs.map((doc) => {
  //       console.log(doc.data());
  //       setPostResults(doc.data());
  //     });
  //     const usersUsernameSnapshot = await getDocs(usersUsernameQuery);
  //     usersUsernameSnapshot.docs.map((doc) => {
  //       setUsernameResults(doc.data());
  //     });
  //     const usersDisplayNameSnapshot = await getDocs(usersDisplayNameQuery);
  //     usersDisplayNameSnapshot.docs.map((doc) => {
  //       setDisplayNameResults(doc.data());
  //     });

  //     console.log("posts", postResults);
  //     console.log("usernames", usernameResults);
  //     console.log("display names", displayNameResults);

  //     const users = usernameResults.concat(displayNameResults);

  //     console.log("users", users);

  //     router.push(`/search?q=${input}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <button
      disabled={!input}
      onClick={handleSearch}
      className="flex justify-center items-center h-full px-4 text-primary/20 dark:text-zinc-800 transition peer-focus:text-primary peer-focus:dark:text-zinc-200 dark:bg-zinc-900 rounded-r-md"
    >
      <BsSearch size={20} />
    </button>
  );
};

export default SearchButton;
