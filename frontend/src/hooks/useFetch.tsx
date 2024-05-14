/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Config } from '../Config';
import useAuth from './useAuth';

const useFetch = (
  method: 'POST' | 'GET' | 'DELETE' | 'PUT',
  requestArray: string[]
) => {
  const auth = useAuth();

  const [loading, setIsLoading] = useState(false);

  const fetchData = async (
    params?: any,
    body?: any,
    customAuthorizationToken: string | null = null,
    useContentType = true
  ): Promise<Response> => {
    setIsLoading(true);

    const parametersToAdd = params ? params : body;
    const url = `${Config.apiBaseUrl}/${requestArray.join(
      '/'
    )}?${new URLSearchParams(parametersToAdd).toString()}`;

    console.log(Config.apiBaseUrl);

    try {
      const response = await fetch(url, {
        method: method || 'GET',
        headers: {
          accept: 'application/json',
          ...(useContentType && {
            'Content-Type': 'application/json',
          }),
          Authorization: `Bearer ${auth.token}`,
          ...(customAuthorizationToken
            ? {
                Authorization: `Bearer ${customAuthorizationToken}`,
              }
            : {}),
        },
        credentials: 'include', // include when using cookies/sessions
        ...(method !== 'GET' &&
          method !== 'DELETE' &&
          body && { body: useContentType ? JSON.stringify(body) : body }),
      });

      setIsLoading(false);

      return response as Response;
    } catch (error: any) {
      setIsLoading(false);

      return new Promise(() => {
        return {
          status: 500,
          statusText: error.message,
        };
      });
    }
  };

  return { fetchData, loading };
};

export default useFetch;
