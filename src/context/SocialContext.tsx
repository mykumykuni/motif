import React, { createContext, useContext, useState } from 'react';
import { Post, User, Comment } from '../types';
import { POSTS } from '../data/mockData';

const MOCK_USER = (id: string, displayName: string): User => ({
  id,
  email: `${id}@motif.app`,
  username: displayName.toLowerCase().replace(/\s+/g, '_'),
  displayName,
  role: 'listener' as const,
  followers: 0,
  following: 0,
  isVerified: false,
  createdAt: '',
  updatedAt: '',
} as User);

const toPost = (p: typeof POSTS[0]): Post => ({
  id: p.id,
  author: {
    id: p.authorId,
    email: `${p.authorId}@motif.app`,
    username: p.authorName.toLowerCase().replace(/\s+/g, '_'),
    displayName: p.authorName,
    role: 'listener' as const,
    followers: 0,
    following: 0,
    isVerified: p.isVerified,
    createdAt: '',
    updatedAt: '',
  } as User,
  content: p.content,
  likes: p.likes,
  comments: p.comments,
  shares: p.shares,
  isLiked: p.isLiked,
  createdAt: p.createdAt,
  updatedAt: p.createdAt,
});

const SEED_POSTS: Post[] = POSTS.map(toPost);
interface SocialContextType {
  // Feed
  feed: Post[];
  isLoadingFeed: boolean;
  refreshFeed: () => Promise<void>;
  loadMoreFeed: () => Promise<void>;

  // Posts
  createPost: (content: string, images?: string[], tags?: string[]) => Promise<Post>;
  likePost: (postId: string) => Promise<void>;
  unlikePost: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;

  // Comments
  getComments: (postId: string) => Promise<Comment[]>;
  addComment: (postId: string, content: string) => Promise<Comment>;
  deleteComment: (commentId: string) => Promise<void>;

  // Following
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  userFollowing: string[];
  userFollowers: string[];

  // Discover
  discoverPosts: Post[];
  loadDiscoverPosts: () => Promise<void>;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feed, setFeed] = useState<Post[]>(SEED_POSTS);
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [userFollowing, setUserFollowing] = useState<string[]>([]);
  const [userFollowers] = useState<string[]>([]);
  const [discoverPosts, setDiscoverPosts] = useState<Post[]>(SEED_POSTS.slice().reverse());

  const refreshFeed = async () => {
    setIsLoadingFeed(true);
    await new Promise(r => setTimeout(r, 600));
    setFeed([...SEED_POSTS]);
    setIsLoadingFeed(false);
  };

  const loadMoreFeed = async () => {};

  const createPost = async (content: string, images?: string[], tags?: string[]): Promise<Post> => {
    const post: Post = {
      id: Date.now().toString(),
      author: MOCK_USER('me', 'You'),
      content, images, tags,
      likes: 0, comments: 0, shares: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setFeed(prev => [post, ...prev]);
    return post;
  };

  const likePost = async (postId: string) => {
    setFeed(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1, isLiked: true } : p));
  };

  const unlikePost = async (postId: string) => {
    setFeed(prev => prev.map(p => p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1), isLiked: false } : p));
  };

  const deletePost = async (postId: string) => {
    setFeed(prev => prev.filter(p => p.id !== postId));
  };

  const getComments = async (_postId: string): Promise<Comment[]> => [];

  const addComment = async (postId: string, content: string): Promise<Comment> => {
    const comment: Comment = {
      id: Date.now().toString(),
      author: MOCK_USER('me', 'You'),
      content, likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setFeed(prev => prev.map(p => p.id === postId ? { ...p, comments: p.comments + 1 } : p));
    return comment;
  };

  const deleteComment = async (_commentId: string) => {};

  const followUser = async (userId: string) => {
    setUserFollowing(prev => [...prev, userId]);
  };

  const unfollowUser = async (userId: string) => {
    setUserFollowing(prev => prev.filter(id => id !== userId));
  };

  const loadDiscoverPosts = async () => {
    setDiscoverPosts([...SEED_POSTS].sort(() => Math.random() - 0.5));
  };

  return (
    <SocialContext.Provider value={{ feed, isLoadingFeed, refreshFeed, loadMoreFeed, createPost, likePost, unlikePost, deletePost, getComments, addComment, deleteComment, followUser, unfollowUser, userFollowing, userFollowers, discoverPosts, loadDiscoverPosts }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) throw new Error('useSocial must be used within SocialProvider');
  return context;
};

