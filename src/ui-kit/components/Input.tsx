import React from 'react';
import {
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { useInputAnimation } from '../hooks/useInputAnimation';
import { useInputProps } from '../hooks/useInputProps';
import { Badge } from './Badge';

const AnimatedText = Animated.createAnimatedComponent(Text);

export interface InputProps extends RNTextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  suggestions?: string[];
  onSuggestionPress?: (suggestion: string) => void;
  tags?: string[];
  onTagRemove?: (tag: string) => void;
  onSubmitTag?: (value: string) => void;
  clearOnTagSubmit?: boolean;
}

/**
 * Common Input component with animated label
 * - Border color from app theme
 * - Transparent background
 * - Animated label that moves up when focused
 */
export function Input({
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  value,
  suggestions,
  onSuggestionPress,
  tags,
  onTagRemove,
  onSubmitTag,
  clearOnTagSubmit = false,
  ...textInputProps
}: InputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const { isFocused, inputProps } = useInputProps(textInputProps);
  const { labelAnimatedStyle, shouldAnimateLabel } = useInputAnimation({
    isFocused,
    hasValue: !!value && value.length > 0,
  });

  const borderColor = isFocused ? colors.tint : colors.icon;
  const labelColor = shouldAnimateLabel ? colors.tint : colors.icon;

  const showSuggestions = suggestions && suggestions.length > 0 && (isFocused || (value && value.length > 0));
  const showTags = tags && tags.length > 0;

  const handleSuggestionPress = (suggestion: string) => {
    if (onSuggestionPress) {
      onSuggestionPress(suggestion);
    }
  };

  const handleSubmitEditing = (e: any) => {
    if (onSubmitTag && value && value.trim().length > 0) {
      const trimmedValue = value.trim();
      onSubmitTag(trimmedValue);
      // Clear the input after submitting the tag only if clearOnTagSubmit is enabled
      if (clearOnTagSubmit && textInputProps.onChangeText) {
        textInputProps.onChangeText('');
      }
    }
    if (textInputProps.onSubmitEditing) {
      textInputProps.onSubmitEditing(e);
    }
  };

  const handleBlur = (e: any) => {
    if (textInputProps.onBlur) {
      textInputProps.onBlur(e);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Animated.View
          style={[
            styles.labelContainer,
            labelAnimatedStyle,
            { backgroundColor: colors.background },
          ]}
          pointerEvents="none"
        >
          <AnimatedText
            style={[
              styles.label,
              { color: labelColor },
              labelStyle,
              { backgroundColor: colors.background }
            ]}
          >
            {label}
          </AnimatedText>
        </Animated.View>
      )}
      <TextInput
        {...inputProps}
        value={value}
        onSubmitEditing={handleSubmitEditing}
        onBlur={handleBlur}
        style={[
          styles.input,
          {
            borderColor,
            color: colors.text,
            backgroundColor: 'transparent',
          },
          inputStyle,
        ]}
        placeholderTextColor={colors.icon}
      />
      {showTags && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              label={tag}
              onPress={() => onTagRemove && onTagRemove(tag)}
              variant="default"
            />
          ))}
        </View>
      )}
      {showSuggestions && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <Badge
              key={index}
              label={suggestion}
              onPress={() => handleSuggestionPress(suggestion)}
              variant="outline"
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 8,
  },
  labelContainer: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dark.text,
    backgroundColor: Colors.light.background,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    minHeight: 56,
    minWidth: 250,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    paddingHorizontal: 4,
  },
});

