import React, { createContext, useContext, useState } from 'react';
import { Post, User, Comment } from '../types';

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
  const [feed, setFeed] = useState<Post[]>([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [userFollowing, setUserFollowing] = useState<string[]>([]);
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const [discoverPosts, setDiscoverPosts] = useState<Post[]>([]);

  const refreshFeed = async () => {
    try {
      setIsLoadingFeed(true);
      // TODO: Implement API call to fetch feed
      console.log('Refreshing feed...');
      // setFeed(await fetchFeed());
    } catch (error) {
      console.error('Error refreshing feed:', error);
    } finally {
      setIsLoadingFeed(false);
    }
  };

  const loadMoreFeed = async () => {
    try {
      // TODO: Implement pagination
      console.log('Loading more feed...');
    } catch (error) {
      console.error('Error loading more feed:', error);
    }
  };

  const createPost = async (content: string, images?: string[], tags?: string[]): Promise<Post> => {
    try {
      // TODO: Implement API call
      const mockPost: Post = {
        id: Date.now().toString(),
        author: {} as User, // TODO: get current user
        content,
        images,
        tags,
        likes: 0,
        comments: 0,
        shares: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setFeed([mockPost, ...feed]);
      return mockPost;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  const likePost = async (postId: string) => {
    try {
      // TODO: Implement API call
      const post = feed.find((p) => p.id === postId);
      if (post) {
        post.likes += 1;
        post.isLiked = true;
        setFeed([...feed]);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const unlikePost = async (postId: string) => {
    try {
      // TODO: Implement API call
      const post = feed.find((p) => p.id === postId);
      if (post) {
        post.likes -= 1;
        post.isLiked = false;
        setFeed([...feed]);
      }
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      // TODO: Implement API call
      setFeed(feed.filter((p) => p.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const getComments = async (postId: string): Promise<Comment[]> => {
    try {
      // TODO: Implement API call
      return [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const addComment = async (postId: string, content: string): Promise<Comment> => {
    try {
      // TODO: Implement API call
      const mockComment: Comment = {
        id: Date.now().toString(),
        author: {} as User, // TODO: get current user
        content,
        likes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const post = feed.find((p) => p.id === postId);
      if (post) {
        post.comments += 1;
        setFeed([...feed]);
      }

      return mockComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      // TODO: Implement API call
      console.log('Deleting comment:', commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const followUser = async (userId: string) => {
    try {
      // TODO: Implement API call
      if (!userFollowing.includes(userId)) {
        setUserFollowing([...userFollowing, userId]);
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      // TODO: Implement API call
      setUserFollowing(userFollowing.filter((id) => id !== userId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const loadDiscoverPosts = async () => {
    try {
      // TODO: Implement API call to load discover posts
      // This should load a mix of trending, recommended, and popular posts
      console.log('Loading discover posts...');
    } catch (error) {
      console.error('Error loading discover posts:', error);
    }
  };

  return (
    <SocialContext.Provider
      value={{
        feed,
        isLoadingFeed,
        refreshFeed,
        loadMoreFeed,
        createPost,
        likePost,
        unlikePost,
        deletePost,
        getComments,
        addComment,
        deleteComment,
        followUser,
        unfollowUser,
        userFollowing,
        userFollowers,
        discoverPosts,
        loadDiscoverPosts,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within SocialProvider');
  }
  return context;
};
