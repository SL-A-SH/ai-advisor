import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/use-theme-color';

type ScreenContainerProps = React.PropsWithChildren<{
  scrollable?: boolean;
  contentContainerStyle?: ViewStyle;
  lightColor?: string;
  darkColor?: string;
}>;

export function ScreenContainer({
  children,
  scrollable = false,
  contentContainerStyle,
  lightColor, 
  darkColor
}: ScreenContainerProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <SafeAreaView style={[{ backgroundColor }, styles.safeArea]} edges={['top', 'left', 'right', 'bottom']}>
      {scrollable ? (
        <ScrollView contentContainerStyle={[styles.scrollContent, contentContainerStyle]}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});