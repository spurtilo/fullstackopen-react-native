import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';

import MyReviewsContainer from './MyReviewsContainer';
import Text from '../Text';

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error loading reviews. Please try again.</Text>;
  }

  return (
    <MyReviewsContainer reviews={data.me.reviews} refetchReviews={refetch} />
  );
};

export default MyReviews;
