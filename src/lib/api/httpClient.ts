import { BASE_URL } from './apiConfig';
import { createHttpError } from './httpError';

export async function fetcher<T>(url: string): Promise<T> {
  const fullUrl = new URL(url, BASE_URL).toString();
  const res = await fetch(fullUrl);

  if (res.ok) {
    return (await res.json()) as T;
  }

  throw await createHttpError(res, fullUrl);
}
