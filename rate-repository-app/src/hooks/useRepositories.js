import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: 'network-only',
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    refetch,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
