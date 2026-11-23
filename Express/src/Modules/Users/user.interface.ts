export interface IUser {
  name: string;
  email: string;
  password: string;
  age?: number;
  role?: string;
}

export interface UUser {
  name?: string;
  password?: string;
  age?: number;
  is_Active?: boolean;
}
