import { User } from '../modules';

export interface IEmailService {
  /**Send the email to the user*/
  send: () => Promise<boolean>;
  /**Create an email to send to the user*/
  create: (user: User.UserEntity) => this;
  /**Build a html for registration email*/
  htmlRegister: () => this;
}
