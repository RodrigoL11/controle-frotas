import styled from 'styled-components/native'
interface InputProps{
    size?: number;
}

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #00000099;
    align-items: center;
    position: absolute;
`

export const Background = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const Card = styled.View`
    width: 95%;
    background-color: ${({theme}) => theme.colors.bg_card};
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    padding: 20px 20px 0px 20px;
    justify-content: space-between;
`

export const Label = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.secondary_color};
    font-size: 14px;
`

export const Column = styled.View<InputProps>`
    width: ${(props) => props.size || 100}%;
    margin-bottom: 25px;
`

export const Row = styled.View`    
    flex-direction: row;
    width: 100%;
    justify-content: space-between;    
`

export const Input = styled.TextInput`
    height: 32px;
    border-bottom-width: 0.6px;
    font-size: 13px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_color};
    border-color: ${({theme}) => theme.colors.secondary_color};
    width: 100%;
`

export const Title = styled.Text`
    font-size: 23px;
    text-align: center;    
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.primary_color};
    margin-bottom: 15px;
`