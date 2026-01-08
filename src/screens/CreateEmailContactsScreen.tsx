import LottieView from 'lottie-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Form, FormField } from '../components/Form';
import { Colors } from '../constants/theme';
import { createEmailContactsFormConfig } from '../form/auth.form';
import { useColorScheme } from '../hooks/use-color-scheme';
import { useNavigation } from '../hooks/use-navigation';
import { CreateEmailContactsCredentials } from '../types/auth';

export default function CreateEmailContactsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { navigate } = useNavigation();

  const handleSubmit = async (values: CreateEmailContactsCredentials, tags?: Record<string, string[]>) => {
    console.log('Form submitted:', values);
    console.log('Email tags:', tags?.emails || []);
    // Navigate to Terms and Conditions screen
    navigate('TermsAndConditions');
  };

  const formFields: FormField[] = [
    {
      name: 'contactType',
      label: 'Contact Type',
      type: 'toggle',
      leftLabel: 'User',
      rightLabel: 'Accountant',
    },
    {
      name: 'emails',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      tagInput: true,
      keyboardType: 'email-address',
      autoCapitalize: 'none',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <LottieView
        source={require('../../assets/animations/contact_green.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={[styles.title, { color: colors.text }]}>Add Email Contacts</Text>
      <Text style={[styles.subtitle, { color: colors.icon }]}>
        Select contact type and add email addresses
      </Text>
      
      <Form<CreateEmailContactsCredentials>
        initialValues={createEmailContactsFormConfig.initialValues}
        validationSchema={createEmailContactsFormConfig.validationSchema}
        fields={formFields}
        onSubmit={handleSubmit}
        submitButtonTitle="Add Contacts"
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
