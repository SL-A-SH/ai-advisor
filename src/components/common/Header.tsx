import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

type HeaderProps = React.PropsWithChildren<{
  title?: string;
}>;

export function Header({ title }: HeaderProps) {
  return (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.headerText}>{title}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 0
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
});