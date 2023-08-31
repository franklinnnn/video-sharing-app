"use client";
import { useEffect, useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import { Dialog } from "@headlessui/react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/utils/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import useCurrentUser from "@/hooks/useCurrentUser";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  // const [progress, setProgress] = useState(1);
  const [fetchedUser, setFetchedUser] = useState({} as any);
  const [files, setFiles] = useState<any[]>([]);

  const { currentUser } = useCurrentUser();

  const getUser = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setFetchedUser(userSnap.data());
    } else {
      console.log("no document");
    }
  };

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

  const handleFiles = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  };

  useEffect(() => {
    handleFiles();
    getUser(currentUser?.uid as string);
  }, []);

  const handleCancel = async () => {
    setFiles([]);
    setLoading(false);
    setCaption("");
    setOpenConfirm(false);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "posts"), {
        caption: caption,
        timestamp: serverTimestamp(),
        userInfo: {
          userId: fetchedUser.uid,
          displayName: fetchedUser.displayName,
          username: fetchedUser.username,
          photoURL: fetchedUser.photoURL,
        },
      });

      await Promise.all(
        files.map((file) => {
          const storageRef = ref(storage, `videos/${docRef.id}/${file.path}`);
          uploadBytesResumable(storageRef, file).then(async () => {
            const downloadURL = await getDownloadURL(storageRef);
            await updateDoc(doc(db, "posts", docRef.id), {
              video: downloadURL,
              postId: docRef.id,
            });
          });
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setFiles([]);
      setCaption("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-1 lg:gap-4 p-6 bg-zinc-900">
      <h1 className="text-2xl font-semibold w-full text-left">Upload video</h1>

      <section className="w-full my-2">
        {files.length < 1 ? (
          <div {...getRootProps({ className: "dropzone" })}>
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <ClipLoader
                  loading={loading}
                  color="#ffffff"
                  size={80}
                  speedMultiplier={0.5}
                />
                <h1>Uploading...</h1>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-6 p-6 h-72 min-h-72 bg-zinc-800 rounded-md border-2 border-dashed border-zinc-700">
                <input {...getInputProps()} />
                <div className="flex flex-col justify-center items-center">
                  <BsCloudUploadFill size={50} />
                  <h1 className="text-xl">Select video to upload</h1>
                  <h2>Or drag and drop a file</h2>
                </div>
                <div className="flex flex-col justify-center items-center text-xs">
                  <p>MP4 or WebM</p>
                  <p>Less than 500MB</p>
                </div>
                <button className="bg-fuchsia-500 w-40 p-2 rounded-md">
                  Select file
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 w-full min-h-72">
            <div>
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex flex-col justify-center items-center"
                >
                  <video controls autoPlay muted className="h-[60vh]">
                    <source src={file.preview} type="video/mp4" />
                  </video>
                  <p>{file.path}</p>
                </div>
              ))}
            </div>
            <div {...getRootProps({ className: "dropzone" })}>
              <button className="bg-fuchsia-500 w-40 p-2 rounded-md">
                Change file
              </button>
            </div>
          </div>
        )}
      </section>

      <input
        type="text"
        placeholder="Write a caption..."
        value={caption}
        required
        className="w-full fontsize-lg bg-zinc-900 border-2 border-zinc-800 p-2 focus:border-zinc-700 focus:outline-none rounded-md"
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className="flex justify-center items-center gap-4 w-full my-4">
        <button
          className="border-2 border-zinc-700 w-40 hover:border-zinc-700/70 py-2 rounded-md"
          onClick={() => setOpenConfirm(true)}
        >
          Cancel
        </button>
        <button
          className="border-2 border-zinc-700 w-40 hover:border-zinc-700/70 py-2 rounded-md"
          onClick={handleUpload}
          disabled={!caption}
        >
          Post
        </button>
      </div>

      <Dialog
        open={openConfirm}
        onClose={handleCancel}
        className="relative z-20"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="flex flex-col items-center justify-center gap-4 bg-zinc-800 rounded-md p-4 w-full md:w-[24rem]">
              <p className="text-2xl font-semibold">Discard upload?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setOpenConfirm(false)}
                  className="px-4 p-2 bg-zinc-900 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 p-2 bg-zinc-900 rounded-md"
                >
                  Discard
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* <section className="w-full">
        <div {...getRootProps({ className: "dropzone" })}>
          {files.length < 1 ? (
            <div className="flex flex-col justify-center items-center gap-6 p-6 h-72 min-h-72 bg-zinc-800 rounded-md border-2 border-dashed border-zinc-700">
              <input {...getInputProps()} />
              <div className="flex flex-col justify-center items-center">
                <BsCloudUploadFill size={50} />
                <h1 className="text-xl">Select video to upload</h1>
                <h2>Or drag and drop a file</h2>
              </div>
              <div className="flex flex-col justify-center items-center text-xs">
                <p>MP4 or WebM</p>
                <p>Less than 500MB</p>
              </div>
              <button className="bg-fuchsia-500 w-40 p-2 rounded-md">
                Select file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 w-full h-72">
              <div>{thumbs}</div>
              <button className="bg-fuchsia-500 w-40 p-2 rounded-md">
                Change file
              </button>
            </div>
          )}
        </div>
      </section> */}
    </div>
  );
};

export default Upload;
