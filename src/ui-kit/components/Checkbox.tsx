import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Callback when checkbox state changes
   */
  onPress?: (checked: boolean) => void;
  /**
   * Label text or ReactNode to display next to checkbox
   */
  label?: string | React.ReactNode;
  /**
   * Custom style for the container
   */
  containerStyle?: ViewStyle;
  /**
   * Custom style for the label text
   */
  labelStyle?: TextStyle;
  /**
   * Custom style for the checkbox box
   */
  boxStyle?: ViewStyle;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
}

/**
 * Checkbox component with theme support
 * - Simple checkbox with label
 * - Theme-aware styling
 * - Disabled state support
 */
export function Checkbox({
  checked = false,
  onPress,
  label,
  containerStyle,
  labelStyle,
  boxStyle,
  disabled = false,
}: CheckboxProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress(!checked);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.box,
          {
            borderColor: checked ? colors.tint : colors.icon,
            backgroundColor: checked ? colors.tint : 'transparent',
          },
          disabled && styles.disabled,
          boxStyle,
        ]}
      >
        {checked && (
          <View
            style={[
              styles.checkmark,
              {
                borderColor: colors.background,
              },
            ]}
          />
        )}
      </View>
      {label && (
        typeof label === 'string' ? (
          <Text
            style={[
              styles.label,
              {
                color: disabled
                  ? colorScheme === 'dark'
                    ? '#6B7280'
                    : '#9CA3AF'
                  : colors.text,
              },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        ) : (
          <View style={styles.label}>
            {label}
          </View>
        )
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    width: 6,
    height: 12,
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});
