"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ModalProps } from "@/types";
import { auth, db, storage } from "@/utils/firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { toast } from "react-toastify";

const EditModal = ({ closeModal }: ModalProps) => {
  const { currentUser } = useCurrentUser();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [website, setWebsite] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
            updateProfile(currentUser, {
              photoURL: downloadURL,
            });

            updateDoc(doc(db, "users", currentUser.uid), {
              photoURL: downloadURL,
            });
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

      // const response = await getDoc(doc(db, "users", currentUser.uid));
      // if (response.exists()) {
      //   await updateDoc(doc(db, "users", currentUser.uid), {
      //     displayName: displayName,
      //     username: username,
      //     bio: bio,
      //     website: website,
      //   });
      // }
      setLoading(false);
      toast.success("Profile edited");
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      closeModal();
      location.reload();
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
  );
};

export default EditModal;
