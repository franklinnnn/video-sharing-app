export interface UserProps {
  bio?: string;
  displayName: string;
  email?: string;
  photoURL: string;
  providerId?: string;
  username: string;
  uid: string;
  website?: string;
}

export interface PostItemProps {
  post: Record<string, any>;
}
