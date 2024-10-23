import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBar,
    paddingTop: Constants.statusBarHeight,
    height: 80,
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} horizontal>
        <AppBarTab title="Repositories" path="/" />
        <AppBarTab title="Sign in" path="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
