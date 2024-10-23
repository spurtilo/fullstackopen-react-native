import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';

import Text from './Text';

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
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const onSubmit = (values) => console.log(values);

const SignIn = () => {
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
        <Pressable onPress={formik.handleSubmit}>
          <View style={styles.button}>
            <Text color="textWhite" fontSize="subHeading" fontWeight="bold">
              Sign in
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
