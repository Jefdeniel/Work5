import { useState, useContext } from 'react';
import { Config } from '../Config';
import Cookies from 'universal-cookie';
import AuthContext from '../store/AuthContext';

const useFetch = (
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
  requestArray: string[]
) => {
  const auth = useContext(AuthContext);
  const cookies = new Cookies();
  const csrftoken = cookies.get('csrftoken');

  const [loading, setIsLoading] = useState(false);

  const fetchData = async (
    params?: any,
    body?: any,
    customAuthorizationToken: string | null = null,
    useContentType = true
  ): Promise<Response> => {
    setIsLoading(true);

    const url = `${Config.apiBaseUrl}/${requestArray.join('/')}?${new URLSearchParams(params).toString()}`;

    const makeRequest = async () => {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            accept: 'application/json',
            ...(useContentType && { 'Content-Type': 'application/json' }),
            ...(auth.token && { Authorization: `Bearer ${auth.token}` }),
            ...(customAuthorizationToken && {
              Authorization: `Bearer ${customAuthorizationToken}`,
            }),
            'X-CSRFToken': csrftoken,
          },
          credentials: 'include',
          ...(method !== 'GET' &&
            method !== 'DELETE' &&
            body && { body: useContentType ? JSON.stringify(body) : body }),
        });

        setIsLoading(false);
        return response;
      } catch (error: any) {
        setIsLoading(false);
        return new Response(JSON.stringify({ message: error.message }), {
          status: 500,
        });
      }
    };

    let response = await makeRequest();

    if (response.status === 401) {
      await auth.refreshToken();
      response = await makeRequest();
    }

    return response;
  };

  return { fetchData, loading };
};

export default useFetch;
