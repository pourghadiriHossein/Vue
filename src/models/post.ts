import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';
import { FetchResponse } from 'src/models/types';
export class Post {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  upVoteCount: number;
  latitude: number;
  longitude: number;

  constructor(
    id: number,
    name?: string,
    title?: string,
    description?: string,
    image?: string,
    upVoteCount?: number,
    latitude?: number,
    longitude?: number
  ) {
    this.id = id;
    this.name = name ?? '';
    this.title = title ?? '';
    this.description = description ?? '';
    this.image = image ?? '';
    this.upVoteCount = upVoteCount ?? 0;
    this.latitude = latitude ?? 37.27;
    this.longitude = longitude ?? 49.53;
  }
  static async myPosts(page: number) {
    const response = await api.get<FetchResponse<Post>>(
      `api/my-posts?page=${page}`
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('My Posts failed');
  }

  static async createPost(
    title: string,
    description: string,
    image: File,
    latitude: number,
    longitude: number
  ) {
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('image', image);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    const response = await api.post<AxiosResponse>(
      'api/create-post',
      data
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Created Failed');
  }

  static async updatePost(
    id: number,
    title: string,
    description: string,
    image: File,
    latitude: number,
    longitude: number
  ) {
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('image', image);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    const response = await api.post<AxiosResponse>(
      `api/update-my-post/${id}`,
      data
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Updated Failed');
  }

  static async deletePost(id: number) {
    const response = await api.get<FetchResponse<Post>>(
      `api/delete-my-post/${id}`
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Deleted Failed');
  }
}
