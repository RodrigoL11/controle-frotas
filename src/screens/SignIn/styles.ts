import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 38px;
  color: ${({ theme }) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.semiBold};
  margin-bottom: 40px;
`;
