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
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required('Repository owner name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be a positive number')
    .max(100, 'Rating must be less than or equal to 100')
    .required('Rating is required'),
  text: yup.string().optional(),
});

const ReviewFormContainer = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const repoOwnerInputStyles = [
    styles.textInput,
    formik.errors.ownerName && { borderColor: theme.colors.textError },
  ];
  const repoNameInputStyles = [
    styles.textInput,
    formik.errors.repositoryName && { borderColor: theme.colors.textError },
  ];
  const repoRatingInputStyles = [
    styles.textInput,
    formik.errors.rating && { borderColor: theme.colors.textError },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text color="textError">{error?.message && error.message}</Text>

        <TextInput
          placeholder="Repository owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          style={repoOwnerInputStyles}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text color="textError">{formik.errors.ownerName}</Text>
        )}

        <TextInput
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          style={repoNameInputStyles}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text color="textError">{formik.errors.repositoryName}</Text>
        )}

        <TextInput
          keyboardType="numeric"
          placeholder="Rating between 0 and 100"
          value={formik.values.rating.toString()}
          onChangeText={(text) => {
            const numericValue = Number(text);
            if (!isNaN(numericValue)) {
              formik.setFieldValue('rating', numericValue);
            }
          }}
          style={repoRatingInputStyles}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text color="textError">{formik.errors.rating}</Text>
        )}

        <TextInput
          multiline
          placeholder="Review"
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          style={styles.textInput}
        />

        <Pressable style={styles.button} onPress={formik.handleSubmit}>
          <Text color="textWhite" fontSize="subHeading" fontWeight="bold">
            Create a review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewFormContainer;
