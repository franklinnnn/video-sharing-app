export interface UserProps {
  displayName: string;
  photoURL: string;
  uid: string;
  bio?: string;
  website?: string;
}

export interface PostItemProps {
  post: Record<string, any>;
}
