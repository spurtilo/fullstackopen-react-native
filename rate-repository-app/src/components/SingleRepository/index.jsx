import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../../graphql/queries';

import Text from '../Text';
import RepositoryItem from '../Main/RepositoryItem';
import ReviewItem from './ReviewItem';
import ItemSeparator from '../ItemSeparator';

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId, first: 8 },
    fetchPolicy: 'cache-and-network',
  });

  const onEndReach = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviewData = data.repository.reviews;
  const reviewNodes = reviewData
    ? reviewData.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem {...data?.repository} displayGithubButton />
          <ItemSeparator />
        </>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
