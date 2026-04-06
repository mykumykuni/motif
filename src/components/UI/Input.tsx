import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../../styles/theme';
import { Text } from './Text';

type InputVariant = 'default' | 'search' | 'error' | 'dropdown';

interface InputProps {
  variant?: InputVariant;
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  errorMessage?: string;
  options?: string[];
  onSelect?: (option: string) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  label,
  placeholder,
  value,
  onChangeText,
  errorMessage,
  options = [],
  onSelect,
  style,
  disabled = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isError = variant === 'error' || !!errorMessage;
  const borderColor = isError
    ? colors.error
    : focused
    ? colors.primary
    : colors.text.secondary;

  // ── Search ──
  if (variant === 'search') {
    return (
      <View style={[searchStyles.container, focused && searchStyles.focused, style]}>
        <Ionicons name="search" size={18} color={colors.text.secondary} />
        <TextInput
          style={searchStyles.input}
          placeholder={placeholder ?? 'Search...'}
          placeholderTextColor={colors.text.secondary}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    );
  }

  // ── Dropdown ──
  if (variant === 'dropdown') {
    return (
      <View style={[style]}>
        {label && (
          <Text variant="body2" weight="medium" style={baseStyles.label}>{label}</Text>
        )}
        <TouchableOpacity
          style={[baseStyles.field, { borderColor }]}
          onPress={() => setDropdownOpen((v) => !v)}
          activeOpacity={0.7}
        >
          <Text
            variant="body1"
            color={value ? colors.text.primary : colors.text.secondary}
            style={{ flex: 1 }}
          >
            {value || placeholder || 'Select option'}
          </Text>
          <Ionicons
            name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
        {dropdownOpen && options.length > 0 && (
          <View style={baseStyles.dropdownList}>
            {options.map((item) => (
              <TouchableOpacity
                key={item}
                style={baseStyles.dropdownItem}
                onPress={() => {
                  onSelect?.(item);
                  setDropdownOpen(false);
                }}
              >
                <Text variant="body1">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }

  // ── Default / Error ──
  return (
    <View style={[style]}>
      {label && (
        <Text variant="body2" weight="medium" style={baseStyles.label}>{label}</Text>
      )}
      <View style={[baseStyles.field, { borderColor }]}>
        <TextInput
          style={baseStyles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={!disabled}
        />
      </View>
      {isError && errorMessage && (
        <Text variant="caption" color={colors.error} style={baseStyles.errorText}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  label: {
    marginBottom: spacing.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.glass.light,
    gap: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    paddingVertical: spacing.xs,
  },
  errorText: {
    marginTop: spacing.xs,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundSheet,
    marginTop: spacing.xs,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
});

const searchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.glass.light,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  focused: {
    borderColor: colors.primary,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },
});
