import { useNavigation as useRNNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import type { AuthStackParamList, RootStackParamList } from '../navigation/types';

type AllRoutes = RootStackParamList & AuthStackParamList;
type NavigationProp = NativeStackNavigationProp<AllRoutes>;

/**
 * Typed navigation hook that provides type-safe navigation methods
 * for both RootStack and AuthStack routes.
 *
 * @example
 * ```tsx
 * const { navigate, replace, reset, goBack } = useNavigation();
 *
 * // Navigate to a route
 * navigate('Home');
 * navigate('Details', { itemId: 1, title: 'Item' });
 *
 * // Replace current screen
 * replace('OTP');
 *
 * // Reset navigation stack
 * reset({ index: 0, routes: [{ name: 'Home' }] });
 *
 * // Go back
 * goBack();
 * ```
 */
export function useNavigation() {
  const navigation = useRNNavigation<NavigationProp>();

  const navigate = useCallback(
    <RouteName extends keyof AllRoutes>(
      name: RouteName,
      params?: AllRoutes[RouteName] extends undefined ? undefined : AllRoutes[RouteName],
    ) => {
      // @ts-expect-error - React Navigation's navigate has complex typing that doesn't work well with our union types
      navigation.navigate(name, params);
    },
    [navigation],
  );

  const replace = useCallback(
    <RouteName extends keyof AllRoutes>(
      name: RouteName,
      params?: AllRoutes[RouteName] extends undefined ? undefined : AllRoutes[RouteName],
    ) => {
      // @ts-expect-error - React Navigation's replace has complex typing that doesn't work well with our union types
      navigation.replace(name, params);
    },
    [navigation],
  );

  const reset = useCallback(
    (state: Parameters<NavigationProp['reset']>[0]) => {
      navigation.reset(state);
    },
    [navigation],
  );

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return {
    navigate,
    replace,
    reset,
    goBack,
  };
}
