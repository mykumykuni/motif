import axios, { AxiosInstance } from 'axios';

let authToken: string | null = null;

const apiConfig = {
  baseURL: 'http://api.motif.local',
  timeout: 10000,
};

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = authToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - redirect to login
          authToken = null;
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async signup(email: string, password: string, username: string) {
    return this.client.post('/auth/signup', { email, password, username });
  }

  async signin(email: string, password: string) {
    return this.client.post('/auth/signin', { email, password });
  }

  async signout() {
    return this.client.post('/auth/signout');
  }

  // Music endpoints
  async searchTracks(query: string, limit = 20) {
    return this.client.get(`/music/search?q=${query}&limit=${limit}`);
  }

  async getTrendingTracks(limit = 50) {
    return this.client.get(`/music/trending?limit=${limit}`);
  }

  async getTrackById(id: string) {
    return this.client.get(`/music/tracks/${id}`);
  }

  async getAlbumById(id: string) {
    return this.client.get(`/music/albums/${id}`);
  }

  async getPlaylistById(id: string) {
    return this.client.get(`/music/playlists/${id}`);
  }

  // Social endpoints
  async getFeed(limit = 20, offset = 0) {
    return this.client.get(`/social/feed?limit=${limit}&offset=${offset}`);
  }

  async getPost(id: string) {
    return this.client.get(`/social/posts/${id}`);
  }

  async createPost(content: string, images?: string[]) {
    return this.client.post('/social/posts', { content, images });
  }

  async likePost(postId: string) {
    return this.client.post(`/social/posts/${postId}/like`);
  }

  async commentPost(postId: string, content: string) {
    return this.client.post(`/social/posts/${postId}/comments`, { content });
  }

  // User endpoints
  async getUserById(id: string) {
    return this.client.get(`/users/${id}`);
  }

  async updateUserProfile(data: any) {
    return this.client.put('/users/profile', data);
  }

  async followUser(userId: string) {
    return this.client.post(`/users/${userId}/follow`);
  }

  async unfollowUser(userId: string) {
    return this.client.post(`/users/${userId}/unfollow`);
  }

  // Generic methods
  get(url: string, config?: any) {
    return this.client.get(url, config);
  }

  post(url: string, data?: any, config?: any) {
    return this.client.post(url, data, config);
  }

  put(url: string, data?: any, config?: any) {
    return this.client.put(url, data, config);
  }

  delete(url: string, config?: any) {
    return this.client.delete(url, config);
  }
}

export const apiClient = new APIClient();

export const setAuthToken = (token: string | null) => {
  authToken = token;
};
