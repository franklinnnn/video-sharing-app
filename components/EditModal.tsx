"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserProps } from "@/types";
import { db, storage } from "@/utils/firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineAddAPhoto } from "react-icons/md";

interface EditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: UserProps;
}

const EditModal = ({ isOpen, closeModal, user }: EditModalProps) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
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

            updateDoc(doc(db, "users", user.uid), {
              photoURL: downloadURL,
            });
          });
        });
      }

      await updateProfile(currentUser, {
        displayName: name,
      });
      const response = await getDoc(doc(db, "users", user.uid));
      if (response.exists()) {
        await updateDoc(doc(db, "users", user.uid), {
          displayName: name,
          username: username,
          bio: bio,
          website: website,
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
      closeModal();
      router.push(`/${username}`);
      alert("profile update");
    }
  };

  useEffect(() => {
    setName(user?.displayName as string);
    setUsername(user?.username as string);
    setProfileImage(user?.photoURL as string);
    setBio(user?.bio as string);
    setWebsite(user?.website as string);
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className="w-screen md:w-[50rem] bg-zinc-800 px-4 py-2 rounded-md">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold py-4 border-b border-zinc-700">
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
                className="bg-zinc-700/50 hover:bg-zinc-700/30 p-4 rounded-full cursor-pointer transition"
              />
            </div>
            {files.length < 1 ? (
              <>
                <Image
                  src={currentUser?.photoURL as string}
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
        <div className="p-4 border-2 border-zinc-700 rounded-md focus-within:border-fuchsia-500 transition">
          <input
            type="text"
            placeholder={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xl w-full bg-inherit outline-none"
          />
        </div>
        <div className="flex flex-row items-center p-4 border-2 border-zinc-700 rounded-md focus-within:border-fuchsia-500 transition">
          <span className="text-xl text-zinc-600">@</span>
          <input
            type="text"
            placeholder={username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-xl w-full bg-inherit outline-none"
          />
        </div>
        <div className="p-4 border-2 border-zinc-700 rounded-md focus-within:border-fuchsia-500 transition">
          <textarea
            name=""
            id=""
            cols={30}
            rows={5}
            maxLength={80}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="text-xl w-full bg-inherit outline-none resize-none"
          ></textarea>
        </div>
        <div className="p-4 border-2 border-zinc-700 rounded-md focus-within:border-fuchsia-500 transition">
          <input
            type="url"
            placeholder={website ? website : ""}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="text-xl w-full bg-inherit outline-none"
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 w-full my-6 pt-6 border-t-2 border-zinc-700">
        <button
          className="border-2 border-zinc-700 w-40 hover:border-zinc-700/70 py-2 rounded-md"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="border-2 border-zinc-700 w-40 hover:border-zinc-700/70 py-2 rounded-md"
          onClick={handleEditProfile}
          // disabled={!caption}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditModal;
