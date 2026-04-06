import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { colors, spacing, borderRadius } from '../../styles/theme';
import { Text } from './Text';

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onTabChange: (key: string) => void;
  style?: ViewStyle;
  scrollable?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeKey,
  onTabChange,
  style,
  scrollable = false,
}) => {
  const renderTabs = () =>
    tabs.map((tab) => {
      const isActive = tab.key === activeKey;
      return (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, isActive && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
          activeOpacity={0.7}
        >
          <Text
            variant="button"
            color={isActive ? colors.primary : colors.text.secondary}
          >
            {tab.label}
          </Text>
          {isActive && <View style={styles.indicator} />}
        </TouchableOpacity>
      );
    });

  return (
    <View style={[styles.wrapper, style]}>
      {scrollable ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {renderTabs()}
        </ScrollView>
      ) : (
        <View style={[styles.row, styles.fill]}>{renderTabs()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.text.secondary,
  },
  row: {
    flexDirection: 'row',
  },
  fill: {
    flex: 1,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  activeTab: {
    // indicator handles the visual emphasis
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: spacing.md,
    right: spacing.md,
    height: 2,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
  },
});
