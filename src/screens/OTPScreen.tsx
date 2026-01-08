import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
import { useOtp } from '../hooks/use-otp';
import { useNavigation } from '../hooks/use-navigation';
import { OTPInput, LinkButton, Button } from '../ui-kit/components';

export default function OTPScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();

  const {
    otp,
    setOtp,
    token,
    isLoading,
    error,
    resendOtp,
    validateOtp,
    clearError,
  } = useOtp({
    tokenNumber: 123456, // TODO: Get from route params or state
    onResend: async () => {
      // TODO: Implement resend OTP API call
      console.log('Resending OTP...');
      // await authService.resendOtp();
    },
    onValidate: async (otpValue) => {
      // TODO: Implement OTP validation API call
      console.log('Validating OTP:', otpValue);
      // const isValid = await authService.validateOtp(otpValue);
      // For now, simulate validation
      return otpValue.length === 6;
    },
  });

  // Auto-validate when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && !isLoading) {
      const timer = setTimeout(() => {
        validateOtp().then((isValid) => {
          if (isValid) {
            navigation.navigate('CreatePassword');
          }
        });
      }, 500); // Small delay to allow user to see the complete OTP

      return () => clearTimeout(timer);
    }
  }, [otp, isLoading, validateOtp, navigation]);

  const handleResend = async () => {
    try {
      await resendOtp();
      setOtp(''); // Clear current OTP
      clearError();
    } catch (err) {
      console.error('Failed to resend OTP:', err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Enter OTP</Text>
      <Text style={[styles.subtitle, { color: colors.icon }]}>
        Please enter the OTP sent to your email
      </Text>

      <OTPInput
        value={otp}
        onChangeText={(text) => {
          setOtp(text);
          clearError();
        }}
        autoFocus
        disabled={isLoading}
        containerStyle={styles.otpContainer}
      />

      {error && (
        <Text style={[styles.errorText, { color: '#EF4444' }]}>{error}</Text>
      )}

      {isLoading && (
        <ActivityIndicator
          size="small"
          color={colors.tint}
          style={styles.loader}
        />
      )}

      <View style={styles.resendContainer}>
        <Text style={[styles.resendText, { color: colors.icon }]}>
          Didn&apos;t receive the code?{' '}
        </Text>
        <LinkButton
          title="Resend OTP"
          onPress={handleResend}
          disabled={isLoading}
        />
      </View>

      {token && (
        <Text style={[styles.tokenText, { color: colors.icon }]}>
          Token: {token}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  otpContainer: {
    marginBottom: 24,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  loader: {
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 24,
  },
  verifyButton: {
    marginTop: 8,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resendText: {
    fontSize: 14,
  },
  tokenText: {
    fontSize: 12,
    marginTop: 8,
  },
});

