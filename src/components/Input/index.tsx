import { Feather } from "@expo/vector-icons";
import { TextInputProps } from 'react-native';
import React, { useState } from "react";

import { useTheme } from 'styled-components'

import {
  Container,
  IconContainer,
  InputText,
  SecurityContainer,
} from "./styles";

export type InputProps = TextInputProps & {
  icon?: keyof typeof Feather.glyphMap;
  value?: string;
  type?: string;
  isVisible?: boolean;
  setVisible?: (e: any) => void;
};

export default function Input({ icon, value, type, isVisible, setVisible, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const theme = useTheme()

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      {icon ? (<IconContainer isFocused={isFocused}>
        <Feather
          name={icon}
          size={24}
          color={isFocused || isFilled ? theme.colors.primary_color : theme.colors.secondary_color}
        />
      </IconContainer>) : null}

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        value={value}
        place
        placeholderTextColor={theme.colors.secondary_color} 
        {...rest}
      />

      {(type === "password" && setVisible) ? (
        <SecurityContainer
          activeOpacity={1}
          isFocused={isFocused}
          onPress={() => setVisible(!isVisible)}
        >
          <Feather
            name={isVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.secondary_color}
          />
        </SecurityContainer>
      ) : null}
    </Container>
  );
}