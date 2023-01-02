import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules';

export interface IJWT extends JwtPayload {
  roles: string[] | User.Role[];
  email: string;
  name: string;
}
