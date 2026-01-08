import LottieView from 'lottie-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Form, FormField } from '../components/Form';
import { Colors } from '../constants/theme';
import { createUserFormConfig } from '../form/auth.form';
import { useColorScheme } from '../hooks/use-color-scheme';
import { useNavigation } from '../hooks/use-navigation';
import { CreateUserCredentials } from '../types/auth';

export default function CreatePasswordScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { navigate } = useNavigation();

  const handleSubmit = async (values: CreateUserCredentials, tags?: Record<string, string[]>) => {
    console.log('Form submitted:', values);
    // Handle form submission here
    // Navigate to CreateEmailContacts screen after successful account creation
    navigate('CreateEmailContacts');
  };

  const formFields: FormField[] = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      autoCapitalize: 'words',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      autoCapitalize: 'words',
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      keyboardType: 'phone-pad',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      secureTextEntry: true,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      secureTextEntry: true,
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <LottieView
        source={require('../../assets/animations/user_person.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
      <Text style={[styles.subtitle, { color: colors.icon }]}>
        Enter your information to create an account
      </Text>
      
      <Form<CreateUserCredentials>
        initialValues={createUserFormConfig.initialValues}
        validationSchema={createUserFormConfig.validationSchema}
        fields={formFields}
        onSubmit={handleSubmit}
        submitButtonTitle="Create Account"
        submitButtonVariant="primary"
        formStyle={styles.form}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
});
