import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { FormField } from '../components/Form';
import { Form } from '../components/Form';
import { Colors } from '../constants/theme';
import { emailVerificationFormConfig } from '../form/auth.form';
import { useColorScheme } from '../hooks/use-color-scheme';
import { useNavigation } from '../hooks/use-navigation';

export default function EmailVerificationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();
  const handleSubmit = async (values: { email: string }) => {
    try {
      // TODO: Implement email verification API call
      console.log('Email verification requested for:', values.email);
      // await authService.verifyEmail(values.email);

      // Navigate to OTP screen after requesting verification
      navigation.navigate('OTP');
    } catch (error) {
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
      <Form
        initialValues={emailVerificationFormConfig.initialValues}
        validationSchema={emailVerificationFormConfig.validationSchema}
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonTitle="Send Verification Email"
        submitButtonVariant="primary"
        submitButtonFullWidth={false}
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
});

 