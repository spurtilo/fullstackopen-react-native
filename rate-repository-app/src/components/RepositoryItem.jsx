import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.whiteBackground,
    padding: 15,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  headerDetails: {
    flex: 1,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  languageTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    gap: 3,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
  },
});

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
}) => {
  const roundNumber = (number) => {
    if (typeof number !== 'number' || isNaN(number)) {
      return 'Invalid number';
    }
    if (number > 999) {
      return Math.round((number / 1000) * 10) / 10 + 'k';
    }
    return number;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.profileImage} />
        </View>

        <View style={styles.headerDetails}>
          <Text fontSize="subHeading" fontWeight="bold">
            {fullName}
          </Text>
          <Text color="textSecondary">{description}</Text>
          <View style={styles.languageTagContainer}>
            <View style={styles.languageTag}>
              <Text color="textWhite">{language}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text fontWeight="bold">{roundNumber(stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight="bold">{roundNumber(forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight="bold">{roundNumber(reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight="bold">{roundNumber(ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
