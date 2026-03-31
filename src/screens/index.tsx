import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading, Container } from '../components/UI';
import { colors, spacing } from '../styles/theme';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
});

export const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <Container padding="lg">
        <Heading color={colors.primary[900]}>
          Welcome to Motif
        </Heading>
      </Container>
    </View>
  );
};

export const DiscoverScreen = () => {
  return (
    <View style={styles.screen}>
      <Container padding="lg">
        <Heading color={colors.primary[900]}>
          Discover
        </Heading>
      </Container>
    </View>
  );
};

export const LibraryScreen = () => {
  return (
    <View style={styles.screen}>
      <Container padding="lg">
        <Heading color={colors.primary[900]}>
          Your Library
        </Heading>
      </Container>
    </View>
  );
};

export const SearchScreen = () => {
  return (
    <View style={styles.screen}>
      <Container padding="lg">
        <Heading color={colors.primary[900]}>
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
        <Heading color={colors.primary[900]}>
          Profile
        </Heading>
      </Container>
    </View>
  );
};
