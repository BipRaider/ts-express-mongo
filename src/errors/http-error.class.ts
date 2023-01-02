import { IHTTPError } from './http-error.interface';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';

export class HTTPError extends Error implements IHTTPError {
  public defaultMessage: string | ReasonPhrases;

  constructor(public statusCode: number | StatusCodes, message: string, public context?: string) {
    super(message);

    this.defaultMessage = getReasonPhrase(statusCode);
  }
}
