import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 137px 0px;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};  
`

export const Row = styled.View`
  flex-direction: row;
  margin: 22px 0px;  
`

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.text_color};
  font-size: 13px;
  font-family: ${({theme}) => theme.fonts.light};
`

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text_color};
  font-size: 22px;
  font-family: ${({theme}) => theme.fonts.regular};
  line-height: 26px;  
`

export const Name = styled.Text`
  color: ${({theme}) => theme.colors.primary_color};
  font-size: 24px;
  font-family: ${({theme}) => theme.fonts.medium};
  line-height: 26px;
`

export const Icon = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`

