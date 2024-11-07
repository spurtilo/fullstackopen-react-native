import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

import theme from '../../theme';

const styles = StyleSheet.create({
  headerContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  searchBar: {
    backgroundColor: theme.colors.whiteBackground,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
});

const RepoFilter = ({ searchQuery, setSearchQuery }) => {
  return (
    <Searchbar
      placeholder="Filter repositories"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchBar}
    />
  );
};

const OrderPicker = ({ currentSortOption, setCurrentSortOption }) => {
  return (
    <Picker
      selectedValue={currentSortOption}
      onValueChange={(itemValue) => setCurrentSortOption(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

const RepositoryListHeader = ({
  currentSortOption,
  searchQuery,
  setCurrentSortOption,
  setSearchQuery,
}) => {
  return (
    <View style={styles.headerContainer}>
      <RepoFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <OrderPicker
        currentSortOption={currentSortOption}
        setCurrentSortOption={setCurrentSortOption}
      />
    </View>
  );
};

export default RepositoryListHeader;
