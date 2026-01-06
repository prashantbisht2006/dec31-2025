'use server';
import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;
console.log("KEY ON SERVER:", API_KEY);
console.log("base url=", BASE_URL);


if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get API key');

export async function fetcher(
  endpoint,
  params = {},
  revalidate = 60,
) {

  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const response = await fetch(url, {
    headers: {
      // 👉 DEMO KEY HEADER AS PER DOC
      'x-cg-demo-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));

    throw new Error(
      `API Error: ${response.status}: ${errorBody.error || response.statusText}`,
    );
  }

  return response.json();
}
