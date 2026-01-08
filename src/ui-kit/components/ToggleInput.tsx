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

export interface ToggleInputProps {
  label?: string;
  value?: 0 | 1 | null | undefined;
  onChange?: (value: 0 | 1) => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  leftLabel?: string;
  rightLabel?: string;
  disabled?: boolean;
}

/**
 * ToggleInput component with two inline buttons
 * - Left button represents value 0
 * - Right button represents value 1
 * - Callback returns the selected value
 */
export function ToggleInput({
  label,
  value,
  onChange,
  containerStyle,
  labelStyle,
  buttonStyle,
  leftLabel = '0',
  rightLabel = '1',
  disabled = false,
}: ToggleInputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = (selectedValue: 0 | 1) => {
    if (!disabled && onChange) {
      onChange(selectedValue);
    }
  };

  const isLeftSelected = value === 0;
  const isRightSelected = value === 1;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: colors.text },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.leftButton,
            {
              borderColor: isLeftSelected ? colors.tint : colors.icon,
              backgroundColor: isLeftSelected ? colors.tint : 'transparent',
            },
            buttonStyle,
            disabled && styles.disabled,
          ]}
          onPress={() => handlePress(0)}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: isLeftSelected ? colors.background : colors.text,
              },
            ]}
          >
            {leftLabel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.rightButton,
            {
              borderColor: isRightSelected ? colors.tint : colors.icon,
              backgroundColor: isRightSelected ? colors.tint : 'transparent',
            },
            buttonStyle,
            disabled && styles.disabled,
          ]}
          onPress={() => handlePress(1)}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: isRightSelected ? colors.background : colors.text,
              },
            ]}
          >
            {rightLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0,
  },
  rightButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
