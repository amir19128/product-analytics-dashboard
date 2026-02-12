type ApiErrorBody = {
  message?: string;
};

export type ApiErrorData = ApiErrorBody | string | undefined;

export class HttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly data?: ApiErrorData;

  constructor(options: {
    status: number;
    statusText: string;
    url: string;
    message: string;
    data?: ApiErrorData;
  }) {
    super(options.message);
    this.name = 'HttpError';
    this.status = options.status;
    this.statusText = options.statusText;
    this.url = options.url;
    this.data = options.data;
  }
}

async function parseErrorBody(res: Response): Promise<ApiErrorData> {
  const contentType = res.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      return (await res.json()) as ApiErrorBody;
    }

    return await res.text();
  } catch {
    return undefined;
  }
}

export async function createHttpError(
  res: Response,
  fullUrl: string
): Promise<HttpError> {
  const data = await parseErrorBody(res);
  const apiMessage = typeof data === 'string' ? data : data?.message;
  const message =
    apiMessage && apiMessage.trim().length > 0
      ? apiMessage
      : `HTTP error ${res.status} ${res.statusText}`;

  return new HttpError({
    status: res.status,
    statusText: res.statusText,
    url: fullUrl,
    message,
    data,
  });
}
