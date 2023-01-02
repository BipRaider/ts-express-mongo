import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export interface IHTTPError extends Error {
  message: string;
  statusCode: number | StatusCodes;
  defaultMessage: string | ReasonPhrases;
  context?: string;
}
