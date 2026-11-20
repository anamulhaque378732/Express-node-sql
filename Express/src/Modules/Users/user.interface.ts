export interface IUser {
  name: string;
  email: string;
  password: string;
  age?: number;
}

export interface UUser {
  name?: string;
  password?: string;
  age?: number;
  is_Active?: boolean;
}
