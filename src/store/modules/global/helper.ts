export interface GlobalStatus {
  requestMap: Map<string, AbortController>;
  error: {
    status: boolean;
    message?: string;
  };
}