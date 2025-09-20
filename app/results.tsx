import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

import { ThemedCard } from "@/components/common/ThemedCard";
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { STRINGS } from '@/constants/strings';

type Recommendation = {
  product_name: string;
  price: string;
  reasons: string[];
  image: string;
};

export default function ResultsScreen() {
  const { data, title } = useLocalSearchParams();
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      title: `Recommendations for ${title}`
    });
  }, [navigation, title]);

  const recommendations: Recommendation[] = JSON.parse(data as string);

  const renderItem = ({ item }: { item: Recommendation }) => (
    <ThemedCard style={styles.card}>
      <View style={styles.row}>
        {/* Image Left (25%) */}
        <View style={styles.imageContainer}>
          <Image 
            source={item.image ? { uri: item.image } : require("@/assets/images/icon.png")} 
            style={styles.image} 
          />
        </View>

        {/* Reasons Right (75%) */}
        <View style={styles.detailsContainer}>
          <ThemedText style={styles.choiceTitle}>{STRINGS.RESULTS.REASON}</ThemedText>
          {item.reasons.map((reason, index) => (
            <ThemedText key={index} style={styles.reason}>
              {index + 1}. {reason}
            </ThemedText>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <ThemedText type="subtitle">{item.product_name}</ThemedText>
        <ThemedText style={styles.price}>₹{item.price}</ThemedText>
      </View>
    </ThemedCard>
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={recommendations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  imageContainer: {
    width: '25%',
    paddingRight: 8,
  },
  detailsContainer: {
    paddingLeft: 8,
    width: '75%',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  choiceTitle: {
    marginBottom: 4,
    fontWeight: '600',
  },
  reason: {
    marginLeft: 8,
    marginBottom: 2,
  },
  footer: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  price: {
    fontWeight: 'bold',
    marginTop: 2,
  },
});
