import { db } from "@/utils/firebase";
import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import FollowersItem from "./FollowersItem";
import { FollowersProps } from "@/types";

const Followers = ({ userId }: FollowersProps) => {
  const followersQuery = query(collection(db, `users/${userId}/followers`));
  const [followers] = useCollectionData(followersQuery);

  return (
    <div>
      {followers && (
        <div>
          {followers.length < 1 ? (
            <div>User has no followers 😔</div>
          ) : (
            <div>
              {followers?.map((user: any) => (
                <FollowersItem user={user} key={user.uid} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Followers;
