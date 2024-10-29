import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();

      return data;
    } catch (e) {
      console.error('Error signing in:', e);
    }
  };

  return [signIn, result];
};

export default useSignIn;
