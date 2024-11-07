import useSignIn from '../../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const SignIn = () => {
  const [signIn, error] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} error={error} />;
};

export default SignIn;
