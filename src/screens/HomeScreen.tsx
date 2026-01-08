import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
import { RootStackParamList } from '../navigation/types';
import { selectDoubleValue, selectExampleValue, selectIsPositive } from '../store/selectors';
import { decrement, increment } from '../store/slices/exampleSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const count = useAppSelector(selectExampleValue);
  const doubleCount = useAppSelector(selectDoubleValue);
  const isPositive = useAppSelector(selectIsPositive);
  const dispatch = useAppDispatch();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Home Screen</Text>
      <Text style={[styles.counter, { color: colors.text }]}>Count: {count}</Text>
      <Text style={[styles.counter, { color: colors.text }]}>Double: {doubleCount}</Text>
      <Text style={[styles.counter, { color: colors.text }]}>Is Positive: {isPositive ? 'Yes' : 'No'}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.navigateButton, { backgroundColor: colors.tint }]}
        onPress={() => navigation.navigate('Details', { itemId: 1, title: 'Details Screen' })}
      >
        <Text style={styles.buttonText}>Go to Details</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  counter: {
    fontSize: 18,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    minWidth: 100,
  },
  navigateButton: {
    // Background color applied via inline style
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

