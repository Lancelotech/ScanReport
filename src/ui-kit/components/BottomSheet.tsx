import BottomSheetLib from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export interface BottomSheetProps {
  /**
   * Whether the bottom sheet is open
   */
  isOpen: boolean;
  /**
   * Callback when the bottom sheet is closed
   */
  onClose: () => void;
  /**
   * Content to render inside the bottom sheet
   */
  children: React.ReactNode;
  /**
   * Snap points for the bottom sheet (in percentage or absolute values)
   * Default: ['25%', '50%', '90%']
   */
  snapPoints?: (string | number)[];
  /**
   * Initial snap point index
   * Default: 1 (middle snap point)
   */
  initialSnapIndex?: number;
  /**
   * Enable pan down to close
   * Default: true
   */
  enablePanDownToClose?: boolean;
  /**
   * Enable content panning gesture
   * Default: true
   */
  enableContentPanningGesture?: boolean;
  /**
   * Background color override
   */
  backgroundColor?: string;
  /**
   * Custom style for the bottom sheet container
   */
  containerStyle?: ViewStyle;
  /**
   * Custom style for the content container
   */
  contentStyle?: ViewStyle;
  /**
   * Show handle indicator
   * Default: true
   */
  showHandle?: boolean;
  /**
   * Handle indicator style
   */
  handleStyle?: ViewStyle;
  /**
   * Background overlay opacity
   * Default: 0.5
   */
  backgroundOpacity?: number;
  /**
   * Callback when snap point changes
   */
  onSnapChange?: (index: number) => void;
}

/**
 * BottomSheet component with theme support
 * - Smooth animations with react-native-reanimated
 * - Multiple snap points support
 * - Gesture handling
 * - Theme-aware styling
 */
export function BottomSheet({
  isOpen,
  onClose,
  children,
  snapPoints = ['25%', '50%', '90%'],
  initialSnapIndex = 1,
  enablePanDownToClose = true,
  enableContentPanningGesture = true,
  backgroundColor,
  containerStyle,
  contentStyle,
  showHandle = true,
  handleStyle,
  backgroundOpacity = 0.5,
  onSnapChange,
}: BottomSheetProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const bottomSheetRef = useRef<BottomSheetLib>(null);

  // Convert snap points to array format
  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  // Handle sheet changes
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      } else {
        onSnapChange?.(index);
      }
    },
    [onClose, onSnapChange]
  );

  // Open/close the sheet based on isOpen prop
  React.useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.snapToIndex(initialSnapIndex);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen, initialSnapIndex]);

  const sheetBackgroundColor = backgroundColor || colors.background;

  return (
    <BottomSheetLib
      ref={bottomSheetRef}
      index={isOpen ? initialSnapIndex : -1}
      snapPoints={memoizedSnapPoints}
      enablePanDownToClose={enablePanDownToClose}
      enableContentPanningGesture={enableContentPanningGesture}
      onChange={handleSheetChanges}
      backgroundStyle={[
        styles.background,
        { backgroundColor: sheetBackgroundColor },
        containerStyle,
      ]}
      handleIndicatorStyle={[
        styles.handleIndicator,
        { backgroundColor: colors.icon },
        handleStyle,
      ]}
      handleStyle={showHandle ? styles.handle : undefined}
      style={styles.sheet}
    >
      <View style={[styles.content, contentStyle]}>{children}</View>
    </BottomSheetLib>
  );
}

const styles = StyleSheet.create({
  sheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  background: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    paddingTop: 10,
    paddingBottom: 4,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
