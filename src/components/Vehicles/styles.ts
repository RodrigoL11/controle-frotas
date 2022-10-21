import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  padding: 0 20px;
`

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.semiBold};
  margin-top: 60px;
  margin-bottom: 34px;
  font-size: 32px;
  
`

export const Card = styled.View `
  width: 100%;
  background-color: ${({theme}) => theme.colors.bg_card};
  padding: 7px;
  //flex-direction: row;
  height: 100px;
  border-radius: 14px;
  margin-bottom: 8px;
`

export const Row = styled.View`
  flex-direction: row;
`

export const Column = styled.View`

`

export const Name = styled.Text`
  color: ${({theme}) => theme.colors.secondary_color};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 15px;
`

export const PlateNumber = styled.Text`
  color: ${({theme}) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: 17px;
`

export const Icon = styled.Text`
  position: absolute;
  left: 20px;
  top: 20px;
`

export const Status = styled.Text`

`

export const BudgetId = styled.Text`
  
`

export const BudgetName = styled.Text`
  
`