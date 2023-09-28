"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ModalProps } from "@/types";
import { db, storage } from "@/utils/firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineAddAPhoto } from "react-icons/md";

const EditModal = ({ closeModal }: ModalProps) => {
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

            updateDoc(doc(db, "users", currentUser.uid), {
              photoURL: downloadURL,
            });
          });
        });
      }

      await updateProfile(currentUser, {
        displayName: name,
      });
      const response = await getDoc(doc(db, "users", currentUser.uid));
      if (response.exists()) {
        await updateDoc(doc(db, "users", currentUser.uid), {
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
    setName(currentUser?.displayName as string);
    setUsername(currentUser?.username as string);
    setProfileImage(currentUser?.photoURL as string);
    setBio(currentUser?.bio as string);
    setWebsite(currentUser?.website as string);
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className="w-screen md:w-[50rem] bg-white px-4 py-2 rounded-md">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold py-4 border-b border-gray-2">
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
                className="bg-gray-2/50 hover:bg-gray-1/50 p-4 rounded-full cursor-pointer transition"
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
        <div className="p-4 border-2 border-gray-2 rounded-md focus-within:border-primary transition">
          <input
            type="text"
            placeholder={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xl w-full bg-inherit outline-none"
          />
        </div>
        <div className="flex flex-row items-center p-4 border-2 border-gray-2 rounded-md focus-within:border-primary transition">
          <span className="text-xl text-zinc-600">@</span>
          <input
            type="text"
            placeholder={username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-xl w-full bg-inherit outline-none"
          />
        </div>
        <div className="p-4 border-2 border-gray-2 rounded-md focus-within:border-primary transition">
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
        <div className="p-4 border-2 border-gray-2 rounded-md focus-within:border-primary transition">
          <input
            type="url"
            placeholder={website ? website : ""}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="text-xl w-full bg-inherit outline-none"
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 w-full my-6 pt-6 border-t-2 border-gray-2">
        <button
          className="border-2 border-gray-2 w-40 hover:border-primary py-2 rounded-md"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="border-2 border-gray-2 w-40 hover:border-primary py-2 rounded-md"
          onClick={handleEditProfile}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditModal;
