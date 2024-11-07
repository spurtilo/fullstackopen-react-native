import React from 'react';
import { FlatList, Pressable } from 'react-native';

import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';
import ItemSeparator from '../ItemSeparator';

class RepositoryListContainer extends React.PureComponent {
  renderHeader = () => {
    const {
      currentSortOption,
      searchQuery,
      setCurrentSortOption,
      setSearchQuery,
    } = this.props;
    return (
      <RepositoryListHeader
        currentSortOption={currentSortOption}
        searchQuery={searchQuery}
        setCurrentSortOption={setCurrentSortOption}
        setSearchQuery={setSearchQuery}
      />
    );
  };

  renderItem = ({ item }) => {
    const { navigate } = this.props;
    return (
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <RepositoryItem {...item} />
      </Pressable>
    );
  };

  getRepositoryNodes = () => {
    const { repositories } = this.props;
    return repositories ? repositories.edges.map((edge) => edge.node) : [];
  };

  render() {
    const { onEndReach } = this.props;

    return (
      <FlatList
        data={this.getRepositoryNodes()}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={this.renderItem}
        keyExtractor={({ id }) => id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;
