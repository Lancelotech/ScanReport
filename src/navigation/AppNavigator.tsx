import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AuthStackParamList, RootStackParamList } from './types';

// Import screens
import AccountantsListScreen from '../screens/AccountantsListScreen';
import CreateEmailContactsScreen from '../screens/CreateEmailContactsScreen';
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import OTPScreen from '../screens/OTPScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';

const MainStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

// Condition to always show auth stack (set to false)
const isAuthenticated = false;

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="EmailVerification"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <AuthStack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
        options={{ title: 'Email Verification' }}
      />
      <AuthStack.Screen
        name="OTP"
        component={OTPScreen}
        options={{ title: 'Enter OTP' }}
      />
      <AuthStack.Screen
        name="CreatePassword"
        component={CreatePasswordScreen}
        options={{ title: 'Create Account' }}
      />
      <AuthStack.Screen
        name="AccountantsList"
        component={AccountantsListScreen}
        options={{ title: 'Accountants' }}
      />
      <AuthStack.Screen
        name="CreateEmailContacts"
        component={CreateEmailContactsScreen}
        options={{ title: 'Add Email Contacts' }}
      />
      <AuthStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
        options={{ title: 'Terms & Conditions' }}
      />
    </AuthStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <MainStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details' }}
      />
    </MainStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
}

