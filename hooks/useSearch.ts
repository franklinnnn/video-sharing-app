import { db } from "@/utils/firebase";
import {
  and,
  collection,
  getDocs,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const useSearch = (input?: string) => {
  const [posts, setPosts] = useState([] as any);
  let postDocs: any[] = [];
  const getPosts = async () => {
    const postsCollection = collection(db, "posts");
    const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));
    const postsSnapshot = await getDocs(postsQuery);
    postsSnapshot.forEach((post) => {
      postDocs.push(post.data());
    });
    const filteredPosts = postDocs.filter((post) =>
      post.caption.toLowerCase().includes(input)
    );
    setPosts(filteredPosts);
  };

  const [users, setUsers] = useState([] as any);
  let userDocs: any[] = [];
  const getUsers = async () => {
    const usersCollection = collection(db, "users");
    const usersQuery = query(usersCollection);
    const usersSnapshot = await getDocs(usersQuery);
    usersSnapshot.forEach((user) => {
      userDocs.push(user.data());
    });
    const filteredUsersByUsername = userDocs.filter((user) =>
      user.username.toLowerCase().includes(input)
    );
    const filteredUsersByDisplayName = userDocs.filter((user) =>
      user.displayName.toLowerCase().includes(input)
    );
    const filteredUsers = filteredUsersByUsername.concat(
      filteredUsersByDisplayName.filter(
        (user) => filteredUsersByUsername.indexOf(user) < 0
      )
    );
    setUsers(filteredUsers);
  };

  useEffect(() => {
    try {
      getPosts();
      getUsers();
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  }, [input]);

  return { posts, users };
};

export default useSearch;
