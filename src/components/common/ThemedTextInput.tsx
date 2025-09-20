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
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return (
    <TextInput
      style={[
        { borderColor },
        styles.textInput,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    color: "#11181C",
    padding: 10,
    margin: 12,
    minHeight: 80
  },
});