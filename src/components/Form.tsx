import { Formik, FormikConfig, FormikProps } from 'formik';
import React, { useState } from 'react';
import {
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import * as yup from 'yup';
import { Button, ButtonSize, ButtonVariant } from '../ui-kit/components/Button';
import { Input } from '../ui-kit/components/Input';
import { ToggleInput } from '../ui-kit/components/ToggleInput';

export interface FormField {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'toggle';
  secureTextEntry?: boolean;
  keyboardType?: RNTextInputProps['keyboardType'];
  autoCapitalize?: RNTextInputProps['autoCapitalize'];
  autoComplete?: RNTextInputProps['autoComplete'];
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  leftLabel?: string;
  rightLabel?: string;
  suggestions?: string[] | ((value: string) => string[]);
  onSuggestionPress?: (suggestion: string, fieldName: string, currentValue: string, setValue: (value: string) => void) => void;
  tagInput?: boolean;
  onTagAdd?: (tag: string, fieldName: string, setValue: (value: string) => void, setTags: (tags: string[]) => void) => void;
  onTagRemove?: (tag: string, fieldName: string, setTags: (tags: string[]) => void) => void;
}

export interface FormProps<T extends Record<string, any>> {
  initialValues: T;
  validationSchema: yup.ObjectSchema<any>;
  fields: FormField[];
  onSubmit: (values: T, tags?: Record<string, string[]>) => void | Promise<void>;
  submitButton?: React.ReactNode;
  submitButtonTitle?: string;
  submitButtonVariant?: ButtonVariant;
  submitButtonSize?: ButtonSize;
  submitButtonFullWidth?: boolean;
  children?: React.ReactNode;
  formStyle?: ViewStyle;
  enableReinitialize?: boolean;
}

// Internal helper to wrap onSubmit for Formik
function createFormikOnSubmit<T extends Record<string, any>>(
  onSubmit: (values: T, tags?: Record<string, string[]>) => void | Promise<void>,
  fieldTags: Record<string, string[]>,
  fields: FormField[]
) {
  return (values: T) => {
    const submitValues = { ...values };
    // Merge tags into form values for tag input fields
    fields.forEach((field) => {
      if (field.tagInput && fieldTags[field.name]) {
        (submitValues as any)[field.name] = fieldTags[field.name];
      }
    });
    return onSubmit(submitValues, fieldTags);
  };
}

export function Form<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  fields,
  onSubmit,
  submitButton,
  submitButtonTitle = 'Submit',
  submitButtonVariant = 'primary',
  submitButtonSize = 'md',
  submitButtonFullWidth = true,
  children,
  formStyle,
  enableReinitialize = false,
}: FormProps<T>) {
  // Track tags for tag input fields
  const [fieldTags, setFieldTags] = useState<Record<string, string[]>>({});

  // Wrap onSubmit to include tags
  const formikOnSubmit = createFormikOnSubmit(onSubmit, fieldTags, fields);

  const formikConfig: FormikConfig<T> = {
    initialValues,
    validationSchema,
    onSubmit: formikOnSubmit,
    enableReinitialize,
  };

  return (
    <Formik {...formikConfig}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }: FormikProps<T>) => (
        <View className="w-full" {...({} as any)} style={formStyle}>
          {fields.map((field) => {
            const fieldName = field.name as keyof T;
            const fieldValue = values[fieldName];
            const fieldError = errors[fieldName];
            const fieldTouched = touched[fieldName];
            const hasError = fieldTouched && fieldError;
            const isTagInput = field.tagInput || false;
            const currentTags = fieldTags[field.name] || [];

            // Determine input type props
            const inputType = field.type || 'text';
            const isToggle = inputType === 'toggle';
            const isPassword = inputType === 'password' || field.secureTextEntry;
            const keyboardType =
              field.keyboardType ||
              (inputType === 'email'
                ? 'email-address'
                : inputType === 'number' || inputType === 'tel'
                ? 'numeric'
                : 'default');

            // Handle tag add
            const handleTagAdd = (tag: string) => {
              if (tag.trim().length === 0) return;
              
              // Validate email if it's an email field
              if (inputType === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(tag.trim())) {
                  return; // Don't add invalid email
                }
              }

              // Check if tag already exists
              if (currentTags.includes(tag.trim())) {
                // Clear input and return
                setFieldValue(field.name, '' as any);
                return;
              }

              const newTags = [...currentTags, tag.trim()];
              setFieldTags({ ...fieldTags, [field.name]: newTags });
              
              // Clear the input
              setFieldValue(field.name, '' as any);
              
              // Call custom handler if provided
              if (field.onTagAdd) {
                field.onTagAdd(tag.trim(), field.name, handleChange(field.name), (tags) => {
                  setFieldTags({ ...fieldTags, [field.name]: tags });
                });
              }
            };

            // Handle tag remove
            const handleTagRemove = (tag: string) => {
              const newTags = currentTags.filter((t) => t !== tag);
              setFieldTags({ ...fieldTags, [field.name]: newTags });
              
              // Call custom handler if provided
              if (field.onTagRemove) {
                field.onTagRemove(tag, field.name, (tags) => {
                  setFieldTags({ ...fieldTags, [field.name]: tags });
                });
              }
            };

            let inputComponent = null;
            
            if (isToggle) {
              inputComponent = (
                <ToggleInput
                  label={field.label}
                  value={fieldValue as 0 | 1 | null | undefined}
                  onChange={(value) => {
                    setFieldValue(field.name, value as any);
                  }}
                  containerStyle={field.containerStyle}
                  labelStyle={field.labelStyle}
                  leftLabel={field.leftLabel}
                  rightLabel={field.rightLabel}
                  disabled={isSubmitting}
                />
              );
            }
            
            if (inputType === 'text' || inputType === 'email' || inputType === 'password' || inputType === 'number' || inputType === 'tel') {
              inputComponent = (
                <Input
                  label={field.label}
                  placeholder={field.placeholder}
                  value={String(fieldValue || '')}
                  onChangeText={handleChange(field.name)}
                  onBlur={isTagInput ? undefined : handleBlur(field.name)}
                  secureTextEntry={isPassword}
                  keyboardType={keyboardType}
                  autoCapitalize={
                    field.autoCapitalize ||
                    (inputType === 'email' ? 'none' : 'sentences')
                  }
                  autoComplete={field.autoComplete}
                  containerStyle={field.containerStyle}
                  inputStyle={field.inputStyle}
                  labelStyle={field.labelStyle}
                  editable={!isSubmitting}
                  suggestions={
                    typeof field.suggestions === 'function'
                      ? field.suggestions(String(fieldValue || ''))
                      : field.suggestions
                  }
                  onSuggestionPress={
                    field.onSuggestionPress
                      ? (suggestion) =>
                          field.onSuggestionPress!(
                            suggestion,
                            field.name,
                            String(fieldValue || ''),
                            handleChange(field.name)
                          )
                      : undefined
                  }
                  tags={isTagInput ? currentTags : undefined}
                  onTagRemove={isTagInput ? handleTagRemove : undefined}
                  onSubmitTag={isTagInput ? handleTagAdd : undefined}
                  clearOnTagSubmit={isTagInput}
                />
              );
            }

            return (
              <View key={field.name} style={field.containerStyle}>
                {inputComponent}
                {hasError && (
                  <View className="mt-1 mb-2 px-1" {...({} as any)}>
                    <Text className="text-xs text-red-500" {...({} as any)}>
                      {String(fieldError)}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}

          {children}

          {(submitButton || submitButtonTitle) && (
            <View className="mt-4" {...({} as any)}>
              {submitButton ? (
                React.isValidElement(submitButton)
                  ? React.cloneElement(submitButton, {
                      onPress: handleSubmit,
                      disabled: isSubmitting,
                    } as any)
                  : submitButton
              ) : (
                <Button
                  title={submitButtonTitle}
                  variant={submitButtonVariant}
                  size={submitButtonSize}
                  textStyle={styles.text}
                  fullWidth={submitButtonFullWidth}
                  onPress={() => handleSubmit()}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  containerStyle={styles.container}
                />
              )}
            </View>
          )}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
  },
  text: {
  textAlign: 'center',
  },
});