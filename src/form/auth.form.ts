import * as yup from 'yup';
import { CreateEmailContactsCredentials, CreateUserCredentials, LoginCredentials, SignupCredentials } from '../types/auth';

// Login Form Schema
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Login Form Initial Values
export const loginInitialValues: LoginCredentials = {
  email: '',
  password: '',
};

// Signup Form Schema
export const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  displayName: yup
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be less than 50 characters')
    .optional(),
});

// Signup Form Initial Values
export const signupInitialValues: SignupCredentials & { confirmPassword: string } = {
  email: '',
  password: '',
  confirmPassword: '',
  displayName: '',
};

// Email Verification Form Schema
export const emailVerificationValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

// Email Verification Form Initial Values
export const emailVerificationInitialValues = {
  email: '',
};

// OTP Form Schema
export const otpValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .length(6, 'OTP must be 6 digits')
    .matches(/^\d+$/, 'OTP must contain only numbers')
    .required('OTP is required'),
});

// OTP Form Initial Values
export const otpInitialValues = {
  otp: '',
};

// Create Password Form Schema
export const createPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

// Create Password Form Initial Values
export const createPasswordInitialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

// Formik Configuration Helpers
export const loginFormConfig = {
  initialValues: loginInitialValues,
  validationSchema: loginValidationSchema,
};

export const signupFormConfig = {
  initialValues: signupInitialValues,
  validationSchema: signupValidationSchema,
};

export const emailVerificationFormConfig = {
  initialValues: emailVerificationInitialValues,
  validationSchema: emailVerificationValidationSchema,
};

export const otpFormConfig = {
  initialValues: otpInitialValues,
  validationSchema: otpValidationSchema,
};

export const createPasswordFormConfig = {
  initialValues: createPasswordInitialValues,
  validationSchema: createPasswordValidationSchema,
};

// Create User Form Schema
export const createUserValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .required('Full name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  phone: yup
    .string()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

// Create User Form Initial Values
export const createUserInitialValues: CreateUserCredentials = {
  fullName: '',
  lastName: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

export const createUserFormConfig = {
  initialValues: createUserInitialValues,
  validationSchema: createUserValidationSchema,
};

// Create Email Contacts Form Schema
export const createEmailContactsValidationSchema = yup.object().shape({
  contactType: yup
    .number()
    .oneOf([0, 1], 'Contact type must be either User (0) or Accountant (1)')
    .required('Contact type is required'),
  emails: yup
    .string()
    .optional(), // Validation for individual emails happens in tag input
});

// Create Email Contacts Form Initial Values
export const createEmailContactsInitialValues: CreateEmailContactsCredentials = {
  contactType: 0, // Default to User
  emails: '',
};

export const createEmailContactsFormConfig = {
  initialValues: createEmailContactsInitialValues,
  validationSchema: createEmailContactsValidationSchema,
};
