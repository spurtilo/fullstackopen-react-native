import { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);
  const [error, setError] = useState(null);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();

      navigate('/');
      return data;
    } catch (e) {
      console.error('Error signing in:', e);
      setError(
        'Failed to sign in. Please check your credentials and try again.'
      );
    }
  };

  return [signIn, error, result];
};

export default useSignIn;
