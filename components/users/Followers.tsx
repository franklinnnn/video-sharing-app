import { db } from "@/utils/firebase";
import { collection, query } from "firebase/firestore";
import Image from "next/image";
import { useCollectionData } from "react-firebase-hooks/firestore";
import FollowButton from "../FollowButton";

interface FollowersProps {
  userId: string;
}

const Followers = ({ userId }: FollowersProps) => {
  const q = query(collection(db, `users/${userId}/followers`));
  const [followers] = useCollectionData(q);

  return (
    <div>
      {followers && (
        <div>
          {followers.length < 1 ? (
            <div>User has no followers</div>
          ) : (
            <div>
              {followers?.map((user: any) => (
                <div
                  key={user.uid}
                  className="flex flex-row gap-4 items-center justify-between p-2 my-2 hover:cursor-pointer"
                >
                  <div className="flex gap-4 items-center justify-start">
                    <Image
                      src={user.photoURL}
                      alt={user.displayName}
                      height={45}
                      width={45}
                      className="object-fit rounded-full"
                    />
                    <div>
                      <p className="text-xl font-semibold hover:underline">
                        {user.displayName}
                      </p>
                      <p className="text-md text-zinc-600">@{user.username}</p>
                    </div>
                  </div>
                  <button>Follow</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Followers;
