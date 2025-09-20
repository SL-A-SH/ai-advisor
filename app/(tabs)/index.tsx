import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

import { Header } from '@/components/common/Header';
import { ThemedButton } from '@/components/common/ThemedButton';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedTextInput } from '@/components/common/ThemedTextInput';
import { ThemedView } from '@/components/common/ThemedView';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { STRINGS } from '@/constants/strings';
import { useRecommendations } from '@/hooks/useRecommendations';

const suggestedPrompts = [
  "Gaming Headphones",
  "Vacuum cleaner", 
  "Hands-free luggage"
];

export default function HomeScreen() {
  const [value, onChangeText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { recommendations, loading, error, fetchRecommendations } = useRecommendations();
  const router = useRouter();

  const onPromptPress = (prompt: string) => {
    onChangeText(prompt);
  };

  const onSubmit = () => {
    setSubmitted(true);
    fetchRecommendations(value);
  };

  useEffect(() => {
    if (recommendations.length > 0) {
      router.push({
      pathname: '/results',
      params: { data: JSON.stringify(recommendations), title: value },
    });
    }
  }, [recommendations]);

  return (
    <ScreenContainer>
      <Header />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.contentContainer}>
          <ThemedText style={styles.suggestedPromptsTitle}>
            {STRINGS.HOME.SUGGESTED_PROMPTS}
          </ThemedText>

          <ThemedView style={styles.promptsContainer}>
            {suggestedPrompts.map((prompt, index) => (
              <ThemedButton
                key={index}
                style={styles.promptButton}
                onPress={() => onPromptPress(prompt)}
              >
                <ThemedText style={styles.promptText}>
                  {prompt}
                </ThemedText>
              </ThemedButton>
            ))}
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedTextInput
              onChangeText={onChangeText}
              value={value}
              placeholder={STRINGS.HOME.INPUT_PLACEHOLDER}
              placeholderTextColor="#797979ff" 
              style={styles.textInput}
              multiline
              numberOfLines={3}
            />
            {value.trim().length > 0 && (
              <TouchableOpacity 
                style={styles.sendButton} 
                onPress={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#007AFF" />
                ) : (
                  <Ionicons name="send" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            )}
          </ThemedView>

          {error && (
            <ThemedText style={styles.errorText}>
              {error}
            </ThemedText>
          )}

          {/* No results message */}
          {submitted && !loading && recommendations.length === 0 && !error && (
            <ThemedText style={styles.noResultsText}>
              No matching products in catalog
            </ThemedText>
          )}

          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for mic button
  },
  promptsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 12,
  },
  promptButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 8,
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  suggestedPromptsTitle: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
  },
  errorText: {
    color: '#FF6B6B',
    marginTop: 10,
    textAlign: 'center',
  },
  noResultsText: {
    color: '#e32828ff',
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  micButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#5DADE2',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
