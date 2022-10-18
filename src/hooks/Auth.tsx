import http from 'api';
import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken?.token
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

export const isAuthenticated = async () => {
  const tokenS = localStorage.getItem('token');
  if (!tokenS) return false
  try {
    await http.get('/auth/verify', {
      headers: {
        'x-access-token': tokenS
      }
    })
    return true
  } catch (err) {
    return false
  }
}

export const Protected = ({ children, userId, paramsId }: any) => {
  const auth = isAuthenticated();
  if (!auth || userId !== paramsId) return (null)
  return (children)
}
