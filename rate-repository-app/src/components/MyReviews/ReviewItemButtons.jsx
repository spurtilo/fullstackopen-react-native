import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../../graphql/mutations';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.whiteBackground,
    flexDirection: 'row',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexGrow: 1,
  },
  deleteButton: {
    backgroundColor: theme.colors.textError,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexGrow: 1,
  },
});

const ReviewItemButtons = ({ repositoryId, reviewId, refetchReviews }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const handleDelete = async () => {
    try {
      await mutate({
        variables: { deleteReviewId: reviewId },
      });
      refetchReviews();
    } catch (error) {
      console.error('Failed to delete review:', error);
      Alert.alert('Error', 'Failed to delete the review. Please try again.');
    }
  };

  const showDeleteAlert = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: handleDelete,
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.viewButton}
        onPress={() => navigate(`/${repositoryId}`)}
      >
        <Text color="textWhite" fontSize="subHeading" fontWeight="bold">
          View repository
        </Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={showDeleteAlert}>
        <Text color="textWhite" fontSize="subHeading" fontWeight="bold">
          Delete review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewItemButtons;
