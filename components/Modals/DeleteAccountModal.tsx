import usePosts from "@/hooks/usePosts";
import useUsers from "@/hooks/useUsers";
import { ModalProps } from "@/types";
import { auth, db, storage } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import {
  GoogleAuthProvider,
  deleteUser,
  reauthenticateWithPopup,
} from "firebase/auth";
import {
  FieldPath,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import Loader from "../Loader";

const DeleteAccountModal = ({ isOpen, closeModal }: ModalProps) => {
  // const [user] = useAuthState(auth);

  const user = auth.currentUser;
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const usersList = useUsers();
  const postsList = usePosts();

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      if (user) {
        handleDeleteUserPosts(user.uid);
        handleDeleteUserFromFollowers();
        handleDeleteUserCommentsLikes();

        const userRef = doc(db, "users", user.uid);
        await deleteDoc(userRef);

        await deleteUser(user)
          .then(() => {
            console.log("user deleted successfully");
            toast.success("Your account has been deleted");
            setLoading(false);
            auth.signOut();
            router.push("/");
            location.reload();
          })
          .catch((error) => {
            console.log(error);
            // reauthWithGoogle();
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const reauthWithGoogle = async () => {
  //   return await reauthenticateWithPopup(auth, provider);
  // };

  const handleDeleteUserPosts = async (uid: string) => {
    const postsCollection = collection(db, `posts`);
    const postsRef = new FieldPath("userInfo", "userId");
    const postsQuery = query(postsCollection, where(postsRef, "==", uid));
    const postsSnapshot = await getDocs(postsQuery);
    const postsToDelete: any[] = [];
    postsSnapshot.forEach((post) => {
      postsToDelete.push(post.data());
    });

    postsToDelete.map((post) => {
      const postRef = doc(db, `/posts/${post.postId}`);
      const videoRef = ref(storage, `/videos/${post.postId}`);

      deleteObject(videoRef)
        .then(() => {
          console.log("video deleted successfully");
        })
        .catch((error) => console.log(error));
      deleteDoc(postRef);
    });
  };

  const handleDeleteUserFromFollowers = () => {
    if (user) {
      usersList?.map(async (followingUser) => {
        const followerRef = doc(
          db,
          `/users/${followingUser.uid}/followers/${user.uid}`
        );
        await deleteDoc(followerRef);
      });
    }
  };

  const handleDeleteUserCommentsLikes = () => {
    if (user) {
      postsList?.map(async (post) => {
        const likeRef = doc(db, `/posts/${post.postId}/likes/${user.uid}`);
        await deleteDoc(likeRef);
        const commentRef = collection(db, `/posts/${post.postId}/comments/`);
        const commentQuery = query(
          commentRef,
          where("userInfo.userId", "==", user.uid)
        );
        const commentSnapshot = await getDocs(commentQuery);
        commentSnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-30">
      <div
        className="fixed inset-0 bg-primary/20 dark:bg-zinc-200/20"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div className="relative flex flex-col justify-center items-center gap-4 w-72 md:w-96 h-72 bg-main-light dark:bg-main-dark px-6 py-12 rounded-md border-2 border-red-500">
            {loading ? (
              <div className="flex flex-col gap-4 justify-center items-center w-full">
                <Loader />
                <p className="font-semibold">Deleting your account...</p>
              </div>
            ) : (
              <>
                <AiFillCloseCircle
                  size={30}
                  className="absolute right-2 top-2 hover:cursor-pointer text-primary/30 hover:text-primary/40 dark:text-zinc-200/30 hover:dark:text-zinc-200/40 transition"
                  onClick={closeModal}
                />
                <h2 className="text-red-500 text-xl text-center font-semibold">
                  Are you sure you want to delete this account?
                </h2>
                <div className="flex gap-2 text-main-light font-semibold">
                  <button
                    className="bg-primary hover:bg-primary/80 w-24 py-2 rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 w-24 py-2 rounded-md"
                    onClick={handleDeleteAccount}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
export default DeleteAccountModal;
