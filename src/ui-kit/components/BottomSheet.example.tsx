/**
 * Example usage of BottomSheet component
 * 
 * This file demonstrates how to use the BottomSheet component in your screens.
 * You can delete this file once you understand how to use it.
 */

import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { BottomSheet } from './BottomSheet';
import { Button as UIButton } from './Button';

export function BottomSheetExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <UIButton
        title="Open Bottom Sheet"
        onPress={() => setIsOpen(true)}
        variant="primary"
      />

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        snapPoints={['25%', '50%', '90%']}
        initialSnapIndex={1}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Bottom Sheet Content
        </Text>
        <Text style={{ marginBottom: 20 }}>
          This is an example of how to use the BottomSheet component.
          You can drag it up and down, or swipe down to close.
        </Text>
        <UIButton
          title="Close"
          onPress={() => setIsOpen(false)}
          variant="primary"
        />
      </BottomSheet>
    </View>
  );
}

/**
 * Advanced example with custom snap points and callbacks
 */
export function AdvancedBottomSheetExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(1);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <UIButton
        title="Open Advanced Bottom Sheet"
        onPress={() => setIsOpen(true)}
        variant="primary"
      />

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        snapPoints={['40%', '70%']}
        initialSnapIndex={0}
        onSnapChange={(index) => {
          setCurrentSnapIndex(index);
          console.log('Snap point changed to:', index);
        }}
        enablePanDownToClose={true}
        showHandle={true}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Current Snap Index: {currentSnapIndex}
        </Text>
        <Text style={{ marginBottom: 20 }}>
          This bottom sheet has custom snap points and tracks the current snap index.
        </Text>
        <UIButton
          title="Close"
          onPress={() => setIsOpen(false)}
          variant="secondary"
        />
      </BottomSheet>
    </View>
  );
}
