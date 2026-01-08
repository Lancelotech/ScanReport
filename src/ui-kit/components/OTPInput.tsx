import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { useInputOTP } from '../hooks/useInputOTP';

export interface OTPInputProps {
  value: string;
  onChangeText: (text: string) => void;
  length?: number;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle | TextStyle;
  textStyle?: TextStyle;
  autoFocus?: boolean;
  disabled?: boolean;
}

/**
 * OTP Input component with six rectangular input fields
 * - Each digit in a separate rectangle
 * - Auto-focuses next input on entry
 * - Supports backspace to go to previous input
 * - Theme-aware styling
 */
export function OTPInput({
  value,
  onChangeText,
  length = 6,
  containerStyle,
  inputStyle,
  textStyle,
  autoFocus = false,
  disabled = false,
}: OTPInputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const {
    focusedIndex,
    inputRefs,
    otpArray,
    handleChangeText,
    handleKeyPress,
    handleFocus,
    handleBlur,
  } = useInputOTP({
    value,
    onChangeText,
    length,
    autoFocus,
  });

  const borderColor = (index: number) => {
    if (disabled) {
      return colorScheme === 'dark' ? '#4B5563' : '#9CA3AF';
    }
    if (focusedIndex === index) {
      return colors.tint;
    }
    return colors.icon;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {otpArray.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={[
            styles.input,
            {
              borderColor: borderColor(index),
              color: colors.text,
              backgroundColor: disabled 
                ? (colorScheme === 'dark' ? '#1F2937' : '#F3F4F6')
                : 'transparent',
            },
            inputStyle,
            textStyle,
          ]}
          value={digit}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          editable={!disabled}
          autoFocus={autoFocus && index === 0}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
