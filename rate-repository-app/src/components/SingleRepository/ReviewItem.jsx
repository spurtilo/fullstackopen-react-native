import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.whiteBackground,
    padding: 15,
    gap: 10,
  },
  ratingIcon: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewDetails: {
    flex: 1,
    gap: 3,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
  return (
    <View style={styles.container}>
      <View style={styles.ratingIcon}>
        <Text color="primary" fontSize="subHeading" fontWeight="bold">
          {review.rating}
        </Text>
      </View>

      <View style={styles.reviewDetails}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
