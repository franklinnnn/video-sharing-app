import { IconType } from "react-icons";

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

export interface PostProps {
  caption: string;
  id: string;
  timestamp: number;
  userInfo: {
    displayName: string;
    photoURL: string;
    id: string;
    username: string;
  };
  video: string;
}

export interface PostItemProps {
  post: Record<string, any>;
}

export interface UserBioProps {
  user: UserProps;
  setActiveTab: (value: string) => void;
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
}

export interface FollowButtonProps {
  user: UserProps;
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
}

export interface FollowersProps {
  userId: string;
}

export interface FollowersItemProps {
  user: UserProps;
}

export interface CommentItemProps {
  postId: string;
  comment: Record<string, any>;
}

export interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
}

export interface SidebarItemProps {
  label: string;
  icon: IconType;
  activeIcon: IconType;
  href: string;
  alert: boolean;
  openModal: () => void;
}
