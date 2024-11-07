import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
  },
  formContainer: {
    backgroundColor: theme.colors.whiteBackground,
    gap: 10,
    padding: 10,
  },
  textInput: {
    backgroundColor: theme.colors.whiteBackground,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match')
    .required('Password confirm is required'),
});

const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const usernameInputStyles = [
    styles.textInput,
    formik.errors.username && { borderColor: theme.colors.textError },
  ];
  const passwordInputStyles = [
    styles.textInput,
    formik.errors.password && { borderColor: theme.colors.textError },
  ];
  const passwordConfirmStyles = [
    styles.textInput,
    formik.errors.passwordConfirm && { borderColor: theme.colors.textError },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          style={usernameInputStyles}
        />
        {formik.touched.username && formik.errors.username && (
          <Text color="textError">{formik.errors.username}</Text>
        )}

        <TextInput
          secureTextEntry
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          style={passwordInputStyles}
        />
        {formik.touched.password && formik.errors.password && (
          <Text color="textError">{formik.errors.password}</Text>
        )}

        <TextInput
          secureTextEntry
          placeholder="Confirm password"
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange('passwordConfirm')}
          style={passwordConfirmStyles}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <Text color="textError">{formik.errors.passwordConfirm}</Text>
        )}

        <Pressable onPress={formik.handleSubmit}>
          <View style={styles.button}>
            <Text color="textWhite" fontSize="subHeading" fontWeight="bold">
              Sign up
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpContainer;
