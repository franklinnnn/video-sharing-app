import FollowersItem from "./FollowersItem";
import { FollowersProps } from "@/types";
import { useFollowers } from "@/hooks/useFollowers";

const Followers = ({ userId }: FollowersProps) => {
  const followers = useFollowers(userId);

  return (
    <div>
      {followers && (
        <div>
          {followers.length < 1 ? (
            <div className="flex justify-center text-lg font-semibold pt-4">
              User has no followers 😔
            </div>
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
