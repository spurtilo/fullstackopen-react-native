import { FlatList, View } from 'react-native';
import ReviewItem from '../SingleRepository/ReviewItem';
import ReviewItemButtons from './ReviewItemButtons';
import ItemSeparator from '../ItemSeparator';

const MyReviewsContainer = ({ reviews, refetchReviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <View>
            <ReviewItem review={item} />
            <ReviewItemButtons
              repositoryId={item.repositoryId}
              reviewId={item.id}
              refetchReviews={refetchReviews}
            />
          </View>
        );
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviewsContainer;
