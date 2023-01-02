import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys, SendSmtpEmail } from 'sib-api-v3-typescript';

import { ENV, IConfigService } from '../config/config.service.interface';
import { TYPES } from '../container/types';
import { IEmailService } from './email.interface';
import { User } from '../modules';
import { ILogger } from '../core';

@injectable()
export class EmailService implements IEmailService {
  private owner: string;
  private apiInstance: TransactionalEmailsApi;
  private apiKey: string;
  private subject: string;
  private html: string;
  private user?: User.UserEntity;

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.ILogger) private logger: ILogger,
  ) {
    this.initOptionsTransport().initTransport();
  }
  /** Func get values to connect to the mail agent*/
  private initOptionsTransport = (): this => {
    this.owner = this.configService.get(ENV.EMAIL_USER);
    this.apiKey = this.configService.get(ENV.EMAIL_API_KEY);
    return this;
  };
  /** Create a transport for send email */
  private initTransport = (): void => {
    try {
      this.apiInstance = new TransactionalEmailsApi();
      this.apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, this.apiKey);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`[Email transport is not init]: ${error.message}`);
      }
    }
  };

  public send = async (): Promise<boolean> => {
    try {
      if (!this.user) return false;

      const sendSmtpEmail = new SendSmtpEmail();
      sendSmtpEmail.subject = this.subject;
      sendSmtpEmail.htmlContent = this.html;
      sendSmtpEmail.sender = { name: this.user?.name, email: this.user?.email };
      sendSmtpEmail.to = [{ email: this.owner, name: '<YOUR NAME>' }];
      sendSmtpEmail.replyTo = { name: this.user?.name, email: this.user?.email };
      sendSmtpEmail.headers = { 'Some-Custom-Name': 'unique-id-1234' };
      sendSmtpEmail.params = { parameter: 'My param value', subject: 'New Subject' };

      await this.apiInstance.sendTransacEmail(sendSmtpEmail);

      return true;
    } catch {
      return false;
    }
  };

  public create = (user: User.UserEntity): this => {
    this.user = user;
    return this;
  };

  public htmlRegister = (): this => {
    this.subject = 'User registered on site';
    this.html = `
    <div>
      <h1>${this.subject}</h1>
      <h2>${this.user?.name}</h2>
      <p>${this.user?.message}</p>
      <a href="mailto:${this.user?.email}">Email user:${this.user?.name}</a>
    </div>`;
    return this;
  };
}
