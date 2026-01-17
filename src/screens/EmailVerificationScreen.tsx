import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { FormField } from '../components/Form';
import { Form } from '../components/Form';
import { Colors } from '../constants/theme';
import { emailVerificationFormConfig } from '../form/auth.form';
import { useColorScheme } from '../hooks/use-color-scheme';
import { useNavigation } from '../hooks/use-navigation';
import { useRequestOtp } from '../hooks/use-request-otp';
// Optional: import { getClientIp } from '../utils/getClientIp'; // Use if you need to pass IP

export default function EmailVerificationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();
  
  const { requestOtp, isLoading, error, clearError } = useRequestOtp({
    onSuccess: () => {
      // Navigate to OTP screen after requesting verification
      navigation.navigate('OTP');
    },
    onError: (errorMessage) => {
      console.error('Email verification error:', errorMessage);
    },
  });

  const handleSubmit = async (values: { email: string }) => {
    clearError(); // Clear any previous errors
    try {
      // Option 1: Request OTP without IP (simpler)
      await requestOtp(values.email);

      // Option 2: Request OTP with IP address (if needed)
      // Uncomment the lines below and import getClientIp if you need to pass IP
      // const ip = await getClientIp();
      // await requestOtp(values.email, ip || undefined);
    } catch (error) {
      // Error is already handled by the hook's onError callback
      console.error('Email verification error:', error);
    }
  };

  const fields: FormField[] = [
    {
      name: 'email',
      label: 'Email',
      placeholder: '',
      type: 'email',
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      autoComplete: 'email',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LottieView
        source={require('../../assets/animations/Welcome.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={[styles.title, { color: colors.text }]}>Email Verification</Text>
      <Text style={[styles.subtitle, { color: colors.icon }]}>Please verify your email address</Text>
      
      {error && (
        <Text style={[styles.errorText, { color: '#EF4444' }]}>{error}</Text>
      )}
      
      <Form
        initialValues={emailVerificationFormConfig.initialValues}
        validationSchema={emailVerificationFormConfig.validationSchema}
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonTitle="Send Verification Email"
        submitButtonVariant="primary"
        submitButtonFullWidth={false}
        isSubmitting={isLoading}
      />
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
  animation: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

 