import {
  Response,
} from 'express-serve-static-core';

interface SendFileOptions {
  maxAge?: number;
  root?: string;
  lastModified?: boolean;
  headers?: {
    [key: string]: string;
  };
  dotfiles?: 'allow' | 'deny' | 'ignore';
  acceptRanges?: boolean;
  cacheControl?: boolean;
  immutable?: boolean;
}

export default class ResponseFactory {
  private response: Response;

  public constructor(response: Response) {
    this.response = response;
  }

  public setStatus(code: number) {
    if (!this.isResponseSent())
      this.response.status(code);
  }

  public setHeader(key: string, value: string) {
    if (!this.isResponseSent())
      this.response.setHeader(key, value);
  }

  public send<Data>(data: Data) {
    if (!this.isResponseSent())
      this.response.send(data);
  }

  public sendJSON<Data>(data: Data) {
    if (!this.isResponseSent()) {
      this.setHeader('Content-Type', 'application/json');
      this.send(JSON.stringify(data));
    }
  }

  public sendFile(file: string, options: SendFileOptions) {
    if (!this.isResponseSent)
      this.response.sendFile(file, options);
  }

  public sendError(e: Error, status: number) {
    const error = {
      details: e.message,
    };

    this.setStatus(status);
    this.send(JSON.stringify(error));
  }

  private isResponseSent() {
    return this.response.headersSent;
  }
}
