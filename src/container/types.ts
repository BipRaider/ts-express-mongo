export const TYPES = {
  Application: Symbol.for('Application'),
  /** logger */
  ILogger: Symbol.for('ILogger'),
  /** error */
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  /** Config data*/
  ConfigService: Symbol.for('ConfigService'),
  /** Connected to database */
  MongoService: Symbol.for('MongoService'),
  //Email
  EmailService: Symbol.for('EmailService'),
};
