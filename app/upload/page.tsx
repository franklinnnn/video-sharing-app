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
import { useRouter } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";

const Upload = () => {
  const { currentUser } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  const router = useRouter();

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
  }, []);

  const handleCancelUpload = async () => {
    setFiles([]);
    setLoading(false);
    setCaption("");
    setOpenConfirmCancel(false);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "posts"), {
        caption: caption,
        timestamp: serverTimestamp(),
        userInfo: {
          userId: currentUser.uid,
          displayName: currentUser.displayName,
          username: currentUser.username,
          photoURL: currentUser.photoURL,
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
      alert("Your video will be available once it has finished uploading");
    } catch (error) {
      console.log(error);
    } finally {
      setFiles([]);
      setCaption("");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (caption) {
      setOpenConfirmCancel(true);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-1 lg:gap-4 p-6 bg-gray-1/50">
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
              <div className="flex flex-col justify-center items-center gap-6 p-6 h-72 min-h-72 bg-white rounded-md border-2 border-dashed border-gray-2">
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
                <button className="bg-primary hover:bg-primary/75 text-white w-40 py-2 rounded-md">
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
              <button className="bg-primary hover:bg-primary/75 text-white w-40 py-2 rounded-md">
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
        className="w-full fontsize-lg bg-white border-2 border-gray-2 p-2 focus:border-primary focus:outline-none rounded-md"
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className="flex justify-center items-center gap-4 w-full my-4">
        <button
          className="bg-primary hover:bg-primary/75 text-white w-40 py-2 rounded-md"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="bg-primary hover:bg-primary/75 text-white w-40 py-2 rounded-md"
          onClick={handleUpload}
          disabled={!caption}
        >
          Post
        </button>
      </div>

      <Dialog
        open={openConfirmCancel}
        onClose={() => setOpenConfirmCancel(false)}
        className="relative z-20"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="relative flex flex-col justify-center items-center gap-4 w-72 md:w-96 h-72 bg-white px-6 py-12 rounded-m">
              <AiFillCloseCircle
                size={30}
                className="absolute right-2 top-2 hover:cursor-pointer text-gray-2 hover:text-gray-2/75 transition"
                onClick={() => setOpenConfirmCancel(false)}
              />
              <p className="text-xl font-semibold">Discard upload?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setOpenConfirmCancel(false)}
                  className="bg-primary hover:bg-primary/75 text-white w-24 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCancelUpload}
                  className="bg-red-500/90 hover:bg-red-500 text-white w-24 py-2 rounded-md"
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
