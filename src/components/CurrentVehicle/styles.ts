import styled from 'styled-components/native'

interface ICheckContainer{
  hasVehicle: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: 20px 30px;
  background-color: ${({theme}) => theme.colors.bg_card};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 22px;
  margin-bottom: 8px;
`

export const SubTitle = styled.Text`
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.light};
  font-size: 14px;
  margin-bottom: 25px;
`

export const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  margin-bottom: 25px;
  min-height: 65px;
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Column = styled.View`
  margin-left: 25px;
  margin-right: 10px;
`

export const CardTitle = styled.Text`
  color: ${({theme}) => theme.colors.secondary_color};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 15px;
`

export const PlateNumber = styled.Text`
  color: ${({theme}) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: 17px;
`

export const CheckContainer = styled.View<ICheckContainer>`
  background-color: ${(props) => props.hasVehicle ? '#06DCAC' : '#dc0636'};
  height: 27px;
  width: 27px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
`

export const ButtonTitle = styled.Text`
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.regular};
`

export const ChangeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 55%;
  background-color: ${({theme}) => theme.colors.primary_color};   
  border-radius: 7px;
  height: 42px;
  padding: 0 13px;
`

export const DisassociateButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 7px;
  height: 44px;
  width: 40%;
  position: absolute;
  right: 0;
`

export const AssociateButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({theme}) => theme.colors.primary_color};   
  border-radius: 7px;
  height: 42px;
`

export const Bar = styled.View`
  width: 100%;
  height: 0.7px;
  background-color: ${({theme}) => theme.colors.secondary_color};
  margin: 25px 0;
`

export const HistoryLabel = styled.Text`
  color: ${({theme}) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: 17px;
  margin-left: 25px;
`

export const Empty = styled.Text`
  color: ${({theme}) => theme.colors.secondary_color};
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 18px;
  margin-left: 25px;
  margin-right: 10px;
`

export const DateLabel = styled.Text`
  color: ${({theme}) => theme.colors.secondary_color};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 11px;
`

export const CountDown = styled.Text`

`
