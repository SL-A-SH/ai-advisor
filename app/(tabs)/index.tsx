import { StyleSheet } from 'react-native';

import { Header } from '@/components/common/Header';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { ScreenContainer } from '@/components/layout/ScreenContainer';

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <Header />
      <ThemedView style={{ alignItems: 'center', marginTop: 20 }}>
        <ThemedText type="title">What are you looking for?</ThemedText>
      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
