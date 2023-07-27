import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';
import { FetchResponse } from 'src/models/types';
export class User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  password: string;

  constructor(
    id: number,
    username?: string,
    email?: string,
    avatar?: string,
    password?: string
  ) {
    this.id = id;
    this.username = username ?? '';
    this.email = email ?? '';
    this.avatar = avatar ?? '';
    this.password = password ?? '';
  }

  static async register(
    username: string,
    email: string,
    password: string,
    avatar: File
  ) {
    const data = new FormData();
    data.append('name', username);
    data.append('email', email);
    data.append('password', password);
    data.append('avatar', avatar);
    const response = await api.post<AxiosResponse>('api/register', data);
    if (response.status == 200) {
      return response;
    }
    throw Error('Register Failed');
  }

  static async profile() {
    const response = await api.get('api/user/profile', {});
    if (response.status == 200) {
      return response;
    }
    throw Error('Profile failed');
  }

  static async updateProfile(
    id: number,
    username: string,
    email: string,
    password: string,
    avatar: File
  ) {
    const data = new FormData();
    data.append('name', username);
    data.append('email', email);
    data.append('password', password);
    data.append('avatar', avatar);
    const response = await api.post<AxiosResponse>(
      `api/update-my-profile/${id}`,
      data
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Update Failed');
  }

  static async allUserForAdmin(page: number) {
    const response = await api.get<FetchResponse<User>>(
      `api/all-users?page=${page}`
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Get All User For Admin Failed');
  }

  static async createUserByAdmin(
    username: string,
    email: string,
    password: string,
    avatar: File,
    role: string
  ) {
    const data = new FormData();
    data.append('name', username);
    data.append('email', email);
    data.append('password', password);
    data.append('avatar', avatar);
    data.append('role', role);
    const response = await api.post<AxiosResponse>(
      'api/create-user-by-admin',
      data
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Created Failed');
  }

  static async updateUserByAdmin(
    id: number,
    username: string,
    email: string,
    password: string,
    avatar: File,
    role: string
  ) {
    const data = new FormData();
    data.append('name', username);
    data.append('email', email);
    data.append('password', password);
    data.append('avatar', avatar);
    data.append('role', role);
    const response = await api.post<AxiosResponse>(
      `api/update-user-by-admin/${id}`,
      data
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Created Failed');
  }
  static async deleteUserByAdmin(id: number) {
    const response = await api.get(`api/delete-user-by-admin/${id}`);
    if (response.status == 200) {
      return response;
    }
    throw Error('Delete User failed');
  }
}
