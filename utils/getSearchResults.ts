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

export const getSearchResults = async (input: string) => {
  let posts: any[] = [];
  let postDocs: any[] = [];
  const postsCollection = collection(db, "posts");
  const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));
  const postsSnapshot = await getDocs(postsQuery);
  postsSnapshot.forEach((post) => {
    postDocs.push(post.data());
  });
  const filteredPosts = postDocs.filter((post) =>
    post.caption.toLowerCase().includes(input)
  );
  posts = filteredPosts;

  let users: any[] = [];
  let userDocs: any[] = [];
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
  users = filteredUsers;

  console.log("users", users);
  console.log("posts", posts);

  return { posts, users };
};

export const getSearchPosts = async (input: string) => {
  let posts: any[] = [];
  let postDocs: any[] = [];
  const postsCollection = collection(db, "posts");
  const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));
  const postsSnapshot = await getDocs(postsQuery);
  postsSnapshot.forEach((post) => {
    postDocs.push(post.data());
  });
  const filteredPosts = postDocs.filter((post) =>
    post.caption.toLowerCase().includes(input)
  );
  posts = filteredPosts;

  return posts;
};

export const getSearchUsers = async (input: string) => {
  let users: any[] = [];
  let userDocs: any[] = [];
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
  users = filteredUsers;

  return users;
};
