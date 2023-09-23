import axios, { CancelTokenSource } from "axios";

export class CancellationSource {
  public tokenSource: CancelTokenSource;

  constructor() {
    this.tokenSource = axios.CancelToken.source();
  }

  public cancel = () => {
    this.tokenSource.cancel();
  }
}