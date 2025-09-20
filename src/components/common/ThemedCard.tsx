import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedCard({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'cardBackground');

  return <View style={[{ backgroundColor }, styles.card, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  card: {
    borderColor: "#67ABDE",
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
});