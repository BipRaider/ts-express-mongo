declare namespace Express {
  export interface Request {
    user: {
      email: string;
      roles: string[];
      name: string;
    };
  }
}
