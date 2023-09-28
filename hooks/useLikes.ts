import { db } from "@/utils/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useLikes = (
  postId?: string,
  userId?: string,
  commentId?: string
) => {
  const [likes, setLikes] = useState<any[]>([]);

  const getPostLikes = async () => {
    const postLikesCollection = collection(db, `posts/${postId}/likes`);
    const postLikesQuery = query(postLikesCollection);
    const postLikesSnapshot = await getDocs(postLikesQuery);
    return postLikesSnapshot.docs.map((item) => item.data());
  };

  const getCommentLikes = async () => {
    const commentLikesCollection = collection(
      db,
      `posts/${postId}/comments/${commentId}/likes`
    );
    const commentLikesQuery = query(commentLikesCollection);
    const commentLikesSnapshot = await getDocs(commentLikesQuery);
    return commentLikesSnapshot.docs.map((item) => item.data());
  };

  const getUserLikedPosts = async () => {
    const likedPostsCollection = collection(db, `/users/${userId}/likedPosts`);
    const likedPostsQuery = query(
      likedPostsCollection,
      orderBy("timestamp", "desc")
    );
    const likedPostsSnapshot = await getDocs(likedPostsQuery);
    return likedPostsSnapshot.docs.map((item) => item.data());
  };

  useEffect(() => {
    try {
      if (postId) {
        getPostLikes().then((data) => setLikes(data));
      }
      if (postId && commentId) {
        getCommentLikes().then((data) => setLikes(data));
      }
      if (userId) {
        getUserLikedPosts().then((data) => setLikes(data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [postId, userId, commentId]);

  return { likes };
};
