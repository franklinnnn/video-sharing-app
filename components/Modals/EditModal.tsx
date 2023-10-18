"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ModalProps } from "@/types";
import { auth, db, storage } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  FieldPath,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { toast } from "react-toastify";
import DeleteAccountModal from "./DeleteAccountModal";
import usePosts from "@/hooks/usePosts";

const EditModal = ({ isOpen, closeModal }: ModalProps) => {
  const auth = getAuth();
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [website, setWebsite] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

  const posts = usePosts();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    maxFiles: 1,
  });

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const currentUserRef = doc(db, "users", currentUser.uid);

      if (files.length > 0) {
        files.map((file) => {
          const storageRef = ref(
            storage,
            `users/${currentUser?.uid}/${currentUser?.uid}_${file.path}`
          );
          uploadBytesResumable(storageRef, file).then(async () => {
            const downloadURL = await getDownloadURL(storageRef);

            await updateDoc(doc(db, "users", currentUser.uid), {
              photoURL: downloadURL,
            });
            setPhotoURL(downloadURL);
          });
        });
      }

      // await updateProfile(currentUser, {
      //   displayName: displayName,
      // });
      await updateDoc(currentUserRef, {
        displayName: displayName,
        username: username,
        bio: bio,
        website: website,
      });

      handleUpdatePosts();
      handleUpdateComments();

      setLoading(false);
      toast.success("Profile edited", {
        onClose: () => location.reload(),
      });
      router.push(`/${username}`);
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  const handleUpdatePosts = async () => {
    try {
      const postsCollection = collection(db, `posts`);
      const postsRef = new FieldPath("userInfo", "userId");
      const postsQuery = query(
        postsCollection,
        where(postsRef, "==", currentUser.uid)
      );
      const postsSnapshot = await getDocs(postsQuery);

      const postsToUpdate: any[] = [];

      postsSnapshot.forEach((post) => {
        const postRef = post.data();
        postsToUpdate.push(postRef);
      });
      postsToUpdate?.map((post) => {
        const postRef = doc(db, "posts", post.postId);
        updateDoc(postRef, {
          "userInfo.username": username,
          "userInfo.displayName": displayName,
          "userInfo.photoURL": photoURL,
        });
        console.log("posts updated");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComments = () => {
    try {
      // const postsCollection = collection(db, `posts`);
      // const postsQuery = query(postsCollection);
      // const postsSnapshot = await getDocs(postsQuery);

      // const postsList: any[] = [];

      // postsSnapshot.forEach((post) => {
      //   const postRef = post.data();
      //   postsList.push(postRef);
      // });
      posts?.map(async (post) => {
        const commentRef = collection(db, `/posts/${post.postId}/comments/`);
        const commentQuery = query(
          commentRef,
          where("userInfo.userId", "==", currentUser.uid)
        );
        const commentSnapshot = await getDocs(commentQuery);
        commentSnapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            "userInfo.username": username,
            "userInfo.displayName": displayName,
            "userInfo.photoURL": photoURL,
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDisplayName(currentUser?.displayName as string);
    setUsername(currentUser?.username as string);
    setPhotoURL(currentUser?.photoURL as string);
    setBio(currentUser?.bio as string);
    setWebsite(currentUser?.website as string);
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [currentUser]);

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-20">
        <div
          className="fixed inset-0 bg-primary/20 dark:bg-main-light/10"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="w-screen max-sm:h-screen md:w-[50rem] bg-main-light dark:bg-main-dark px-4 py-2 rounded-md max-sm:overflow-auto">
              <div className="relative flex flex-col gap-4 overflow-y-auto">
                <AiFillCloseCircle
                  size={30}
                  className="absolute right-2 top-2 hover:cursor-pointer text-primary/30 hover:text-primary/40 dark:text-zinc-200/30 hover:dark:text-zinc-200/40 transition"
                  onClick={closeModal}
                />
                <h1 className="text-2xl font-semibold py-4 border-b-2 border-primary/20 dark:border-zinc-200/20">
                  Edit profile
                </h1>
                <div className="flex items-center justify-center py-6 ">
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className="relative first-line:flex items-center justify-center w-[150px] h-[150px] rounded-full overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-full flex items-center justify-center p-6 rounded-full">
                      <MdOutlineAddAPhoto
                        size={60}
                        className="text-primary bg-zinc-200/40 hover:bg-zinc-200/50 p-4 rounded-full cursor-pointer focus-within:dark:border-zinc-200 transition"
                      />
                    </div>
                    {files.length < 1 ? (
                      <>
                        <Image
                          src={photoURL}
                          width={150}
                          height={150}
                          alt="User profile photo"
                          className="object-fit"
                        />
                      </>
                    ) : (
                      <>
                        {files.map((file) => (
                          <div key={file.path}>
                            <Image
                              src={file.preview}
                              width={150}
                              height={150}
                              alt="User profile photo"
                              className="object-fit"
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div className="p-4 border-2 border-primary/20 dark:border-zinc-200/20 rounded-md focus-within:border-primary focus-within:dark:border-zinc-200 transition">
                  <input
                    type="text"
                    placeholder={displayName}
                    value={displayName || ""}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="text-xl w-full bg-inherit outline-none"
                  />
                </div>
                <div className="flex flex-row items-center p-4 border-2 border-primary/20 dark:border-zinc-200/20 rounded-md focus-within:border-primary focus-within:dark:border-zinc-200 transition">
                  <span className="text-xl text-zinc-600">@</span>
                  <input
                    type="text"
                    placeholder={username}
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-xl w-full bg-inherit outline-none"
                  />
                </div>
                <div className="p-4 border-2 border-primary/20 dark:border-zinc-200/20 rounded-md focus-within:border-primary focus-within:dark:border-zinc-200 transition">
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={5}
                    maxLength={240}
                    value={bio || ""}
                    onChange={(e) => setBio(e.target.value)}
                    className="text-xl w-full bg-inherit outline-none resize-none"
                  ></textarea>
                </div>
                <div className="p-4 border-2 border-primary/20 dark:border-zinc-200/20 rounded-md focus-within:border-primary focus-within:dark:border-zinc-200 transition">
                  <input
                    type="url"
                    placeholder={website ? website : ""}
                    value={website || ""}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="text-xl w-full bg-inherit outline-none"
                  />
                </div>
                <button
                  onClick={() => setOpenDeleteAccount(true)}
                  className="w-full sm:w-44 my-2 text-red-500 border-2 border-red-500 font-semibold rounded-md hover:bg-red-500 hover:text-main-light transition"
                >
                  Delete account
                </button>
              </div>
              <div className="flex justify-center items-center gap-4 w-full my-6 pt-6 border-t-2 border-primary/20 text-main-light font-semibold">
                <button
                  className="bg-primary hover:bg-primary/80 w-40 py-2 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary hover:bg-primary/80 w-40 py-2 rounded-md"
                  onClick={handleEditProfile}
                >
                  {loading ? "Saving..." : "Edit"}
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <DeleteAccountModal
        isOpen={openDeleteAccount}
        closeModal={() => setOpenDeleteAccount(false)}
      />
    </>
  );
};

export default EditModal;
