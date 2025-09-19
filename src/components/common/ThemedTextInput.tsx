import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return (
    <TextInput
      style={[
        { color, borderColor, backgroundColor },
        styles.textInput,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderWidth: 1,
    margin: 12,
    borderRadius: 20,
  },
});