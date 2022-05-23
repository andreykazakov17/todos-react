import { IUser } from './user';

export interface IAuthorization {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
