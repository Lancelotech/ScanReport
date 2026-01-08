import React from 'react';
import {
	Pressable,
	PressableProps,
	StyleSheet,
	Text,
	TextStyle,
	ViewStyle
} from 'react-native';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export interface BadgeProps extends Omit<PressableProps, 'children'> {
  label: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'default' | 'outline';
}

/**
 * Badge component for displaying suggestions or tags
 * - Supports pressable badges for selection
 * - Theme-aware styling
 */
export function Badge({
  label,
  containerStyle,
  textStyle,
  variant = 'default',
  onPress,
  ...pressableProps
}: BadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const isPressable = !!onPress;

  return (
    <Pressable
      onPress={onPress}
      disabled={!isPressable}
      style={[
        styles.container,
        {
          backgroundColor:
            variant === 'outline' ? 'transparent' : colors.tint + '20',
          borderColor: colors.tint,
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        containerStyle,
        !isPressable && styles.nonPressable,
      ]}
      {...pressableProps}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.tint,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  nonPressable: {
    opacity: 1,
  },
});
