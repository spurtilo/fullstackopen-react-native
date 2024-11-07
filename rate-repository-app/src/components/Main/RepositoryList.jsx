import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const sortingOptions = {
  latest: {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highest: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowest: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const RepositoryList = () => {
  const [currentSortOption, setCurrentSortOption] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const { repositories, loading, error, refetch, fetchMore } = useRepositories({
    first: 8,
    ...sortingOptions[currentSortOption],
  });
  const navigate = useNavigate();

  useEffect(() => {
    refetch({
      ...sortingOptions[currentSortOption],
      searchKeyword: debouncedQuery,
    });
  }, [currentSortOption, debouncedQuery, refetch]);

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error loading reviews. Please try again.</Text>;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      currentSortOption={currentSortOption}
      searchQuery={searchQuery}
      setCurrentSortOption={setCurrentSortOption}
      setSearchQuery={setSearchQuery}
      navigate={navigate}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
