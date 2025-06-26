export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  createdAt: string;
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}