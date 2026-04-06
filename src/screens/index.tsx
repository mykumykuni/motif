import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Container } from '../components/UI';
import { colors, spacing } from '../styles/theme';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <Container padding="lg">
        <Text variant="h1" color={colors.text.primary}>
          Welcome to Motif
        </Text>
      </Container>
    </View>
  );
};

export const DiscoverScreen = () => {
  return (
    <View style={styles.screen}>
      <Container padding="lg">
        <Text variant="h1" color={colors.text.primary}>
          Discover
        </Text>
      </Container>
    </View>
  );
};

export const LibraryScreen = () => {
  return (
    <View style={styles.screen}>
      <Container padding="lg">
        <Text variant="h1" color={colors.text.primary}>
          Your Library
        </Text>
      </Container>
    </View>
  );
};

export const SearchScreen = () => {
  return (
    <View style={styles.screen}>
      <Container padding="lg">
        <Heading color={colors.text.primary}>
          Search
        </Heading>
      </Container>
    </View>
  );
};

export const ProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <Container padding="lg">
        <Heading color={colors.text.primary}>
          Profile
        </Heading>
      </Container>
    </View>
  );
};
