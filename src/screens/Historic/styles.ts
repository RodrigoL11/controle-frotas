import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
`

export const Title = styled.Text`
  margin-top: 74px;
  margin-left: 30px;
  color: ${({theme}) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.semiBold};
  font-size: 36px;
  margin-bottom: 16px;
`

export const Icon = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 10px;
`

export const Card = styled.View`
  background-color: ${({theme}) => theme.colors.bg_card};
  padding: 8px 25px;
`

export const Separator = styled.View`
  width: 100%;
  height: 0.5px;
  top: 8px;
  background-color: ${({theme}) => theme.colors.secondary_color};
`

export const Label = styled.Text`
  color: ${({theme}) => theme.colors.secondary_color};
  font-family: ${({theme}) => theme.fonts.light};
  font-size: 11px;
  margin-bottom: -4px;
`

export const Destiny = styled.Text`
  color: ${({theme}) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 15px;
`

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 13px;
`

export const Empty = styled.Text`
  background-color: ${({theme}) => theme.colors.bg_card};
  font-size: ${({theme}) => theme.fonts.medium};
  text-align: center;
  width: 100%;
  padding: 8px 25px;
`

export const Row = styled.View`
  flex-direction: row;
`

export const Column = styled.View`

`