import { StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const AppBarTab = ({ title, path }) => {
  return (
    <Link to={path}>
      <View style={styles.container}>
        <Text color="textWhite" fontSize="subHeading">
          {title}
        </Text>
      </View>
    </Link>
  );
};

export default AppBarTab;
