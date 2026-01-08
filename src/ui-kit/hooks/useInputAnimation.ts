import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface UseInputAnimationProps {
  isFocused: boolean;
  hasValue: boolean;
}

interface UseInputAnimationReturn {
  labelAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  shouldAnimateLabel: boolean;
}

/**
 * Custom hook for managing input label animation
 * Animates label up when input is focused or has value
 */
export function useInputAnimation({
  isFocused,
  hasValue,
}: UseInputAnimationProps): UseInputAnimationReturn {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const shouldAnimateLabel = isFocused || hasValue;

  useEffect(() => {
    if (shouldAnimateLabel) {
      // Animate label up and scale down
      translateY.value = withTiming(-30, { duration: 200 });
      scale.value = withTiming(0.9, { duration: 200 });
    } else {
      // Animate label back to original position
      translateY.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
    }
  }, [shouldAnimateLabel, translateY, scale]);

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return {
    labelAnimatedStyle,
    shouldAnimateLabel,
  };
}

