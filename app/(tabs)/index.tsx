import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Header } from '@/components/common/Header';
import { ThemedButton } from '@/components/common/ThemedButton';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedTextInput } from '@/components/common/ThemedTextInput';
import { ThemedView } from '@/components/common/ThemedView';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { STRINGS } from '@/constants/strings';
import { useRecommendations } from '@/hooks/useRecommendations';

export default function HomeScreen() {
  const [value, onChangeText] = React.useState('');
  const { recommendations, loading, error, fetchRecommendations } = useRecommendations();
  const router = useRouter();

  const onSubmit = () => {
    fetchRecommendations(value);
  };

  // useEffect(() => {
  //   if (recommendations.length > 0) {
  //     router.push({
  //       pathname: '/results',
  //       params: { data: JSON.stringify(recommendations) },
  //     });
  //   }
  // }, [recommendations]);

  return (
    <ScreenContainer>
      <Header />
      <ThemedView style={{ flex: 1, justifyContent: 'space-between' }}>

        <ThemedView style={{ marginTop: 20 }}>
          <ThemedText 
            style={{ alignSelf: 'center', marginBottom: 20 }} 
            type="title"
          >
            {STRINGS.HOME.TITLE}
          </ThemedText>
          <ThemedTextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={STRINGS.HOME.INPUT}
            editable
            multiline
            numberOfLines={4}
          />
          {error && (
            <ThemedText style={{ color: 'red' }}>
              {error}
            </ThemedText>
          )}
        </ThemedView>

        <ThemedView style={{ padding: 20 }}>
           {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <ThemedButton onPress={onSubmit}>
              <ThemedText>{STRINGS.HOME.SEARCH_BUTTON}</ThemedText>
            </ThemedButton>
          )}
        </ThemedView>

      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});
