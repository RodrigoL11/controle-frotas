import styled, { css } from 'styled-components/native'

interface IColumn{
  size?: number;
}

interface ICard{
  isDisabled: boolean;
}


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
  font-size: 32.5px;
`

export const Card = styled.TouchableOpacity<ICard>`
  width: 100%;
  background-color: ${({theme}) => theme.colors.bg_card};
  padding: 10px 15px;
  border-radius: 14px;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 2px;
  border-color: #038467;
  
  ${({ isDisabled }) => 
    isDisabled &&
    css`
      border-color: #840320;
    `
  }
`

export const Column = styled.View<IColumn>`
  width: ${(props) => props.size}%;
`

export const Name = styled.Text`
  color: ${({theme}) => theme.colors.secondary_color};
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 15px;
  margin-bottom: -4px;
`

export const PlateNumber = styled.Text`
  color: ${({theme}) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 16px;
  margin-bottom: -4px;
`

export const Icon = styled.Text`
  position: absolute;
  top: 10px;
  left: -2px;
`

export const Status = styled.Text`
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.light};
  font-size: 11px;
  text-align: center;
  
`

export const SelectContainer = styled.View`
  margin-left: 45px;
  height: 27px;
  width: 27px;
  border-width: 1px;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 999px;
  border-color: ${({theme}) => theme.colors.secondary_color};
  align-items: center;
  justify-content: center;
`