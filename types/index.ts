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
export type UserBioProps = {
  user: UserProps;
  setActiveTab: (value: string) => void;
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
};

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
export type PostItemProps = {
  post: Record<string, any>;
};
export type PostFeedProps = {
  userId?: string;
};
export type VideoProps = {
  video: string;
  isBigVideo?: boolean;
};

export type FollowButtonProps = {
  user: UserProps;
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
  openModal: () => void;
};
export type FollowersProps = {
  userId: string;
};
export type FollowersItemProps = {
  user: UserProps;
};

export type LikesProps = {
  userId: string;
};
export type LikesItemProps = {
  item: Record<string, any>;
};

export type CommentFeedProps = {
  post: Record<string, any>;
};
export type CommentItemProps = {
  postId: string;
  comment: Record<string, any>;
};
export type CommentInputProps = {
  postId: string;
  postUserId: string;
};
export type CommentButtonProps = {
  postId: string;
  onClick: () => void;
};

export type LikeCommentButtonProps = {
  postId: string;
  commentId: string;
};
export type LikePostButtonProps = {
  postId: string;
  userId: string;
};

export type NotificationsItemProps = {
  notification: Record<string, any>;
};

export type CategoriesProps = {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
};

export type SidebarItemProps = {
  label: string;
  icon: IconType;
  activeIcon: IconType;
  href: string;
  activeSegment: string | null;
  alert: boolean;
  openModal: () => void;
};

export type ModalProps = {
  isOpen?: boolean;
  user?: UserProps;
  postId?: string;
  href?: string;
  closeModal: () => void;
};

export type SearchFormProps = {
  setPosts: (value: any[]) => void;
  setUsers: (value: any[]) => void;
  setLoading: (value: boolean) => void;
};

export type SearchResultsProps = {
  posts: any[];
  users: any[];
  loading: boolean;
};
