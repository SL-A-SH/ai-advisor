import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return (
    <TouchableOpacity
      style={[
        { backgroundColor },
        styles.button,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  },
});