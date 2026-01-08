import React from 'react';
import {
	Pressable,
	PressableProps,
	StyleSheet,
	Text,
	TextStyle,
	ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export interface LinkButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  underline?: boolean;
}

/**
 * Link Button component with underline support
 * - Styled as a text link
 * - Optional underline decoration
 * - Theme-aware styling
 * - Disabled state support
 */
export function LinkButton({
  title,
  containerStyle,
  textStyle,
  disabled = false,
  underline = true,
  onPress,
  ...pressableProps
}: LinkButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const isDisabled = disabled;

  const textColor = isDisabled
    ? (colorScheme === 'dark' ? '#6B7280' : '#9CA3AF')
    : colors.tint;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={[styles.container, containerStyle]}
      {...pressableProps}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            textDecorationLine: underline ? 'underline' : 'none',
            opacity: isDisabled ? 0.5 : 1,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
