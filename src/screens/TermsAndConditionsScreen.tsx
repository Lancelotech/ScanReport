import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
import { useNavigation } from '../hooks/use-navigation';
import { BottomSheet, Button, Checkbox, LinkButton } from '../ui-kit/components';

export default function TermsAndConditionsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { navigate } = useNavigation();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleContinue = () => {
    if (isAccepted) {
      // Navigate to next screen or complete registration
      console.log('Terms accepted, continuing...');
      // For now, just log - you can navigate to the next screen
      // navigate('Home'); // or whatever the next screen is
    }
  };

  const handleOpenTerms = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <LottieView
          source={require('../../assets/animations/terms_cond.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={[styles.title, { color: colors.text }]}>
          Terms & Conditions
        </Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Please review and accept our terms and conditions to continue
        </Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={isAccepted}
            onPress={setIsAccepted}
            label={
              <View style={styles.labelContainer}>
                <Text style={[styles.labelText, { color: colors.text }]}>
                  I accept the{' '}
                </Text>
                <LinkButton
                  title="Terms and Conditions"
                  onPress={handleOpenTerms}
                  underline={true}
                  textStyle={styles.linkText}
                />
              </View>
            }
          />
        </View>

        <Button
          title="Accept Terms and Conditions"
          variant="primary"
          size="lg"
          onPress={handleContinue}
          disabled={!isAccepted}
          fullWidth
          containerStyle={styles.button}
        />
      </ScrollView>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        snapPoints={['50%', '90%']}
        initialSnapIndex={0}
      >
        <ScrollView
          style={styles.bottomSheetContent}
          contentContainerStyle={styles.bottomSheetScrollContent}
        >
          <Text style={[styles.bottomSheetTitle, { color: colors.text }]}>
            Terms and Conditions
          </Text>
          <Text style={[styles.bottomSheetText, { color: colors.text }]}>
            This is a demo version of the Terms and Conditions. In the full
            version, this would contain the complete legal text outlining the
            terms of service, privacy policy, user rights, and responsibilities.
          </Text>
          <Text style={[styles.bottomSheetText, { color: colors.text }]}>
            By using this application, you agree to comply with all applicable
            laws and regulations. You are responsible for maintaining the
            confidentiality of your account information.
          </Text>
          <Text style={[styles.bottomSheetText, { color: colors.text }]}>
            The service is provided "as is" without warranties of any kind. We
            reserve the right to modify these terms at any time.
          </Text>
        </ScrollView>
      </BottomSheet>
    </>
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
    width: 400,
    height: 400,
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
  checkboxContainer: {
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  labelText: {
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bottomSheetContent: {
    flex: 1,
  },
  bottomSheetScrollContent: {
    paddingBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomSheetText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});
