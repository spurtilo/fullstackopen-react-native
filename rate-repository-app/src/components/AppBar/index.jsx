import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { useQuery, useApolloClient } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';

import theme from '../../theme';
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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  });

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} horizontal>
        <AppBarTab title="Repositories" path="/" />
        {data.me ? (
          <AppBarTab title="Sign out" signOut={signOut} />
        ) : (
          <AppBarTab title="Sign in" path="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
