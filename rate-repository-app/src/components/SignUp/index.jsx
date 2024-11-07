import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutations';
import useSignIn from '../../hooks/useSignIn';
import SignUpContainer from './SignUpContainer';

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await createUser({
        variables: { user: { username, password } },
      });
      console.log(data);

      signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
