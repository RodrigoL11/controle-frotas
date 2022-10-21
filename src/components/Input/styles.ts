import styled, { css } from "styled-components/native";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  height: 56px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: ${({theme}) => theme.colors.bg_card};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${({theme}) => theme.colors.primary_color};
    `};
`;

export const InputText = styled.TextInput<Props>`
  flex: 1;
  background-color: ${({theme}) => theme.colors.bg_card};
  color: ${({theme}) => theme.colors.text_color};
  padding: 0 15px;
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 13px;

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${({theme}) => theme.colors.primary_color};
    `};
`;

export const SecurityContainer = styled.TouchableOpacity<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.bg_card};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${({theme}) => theme.colors.primary_color};
    `};
`;