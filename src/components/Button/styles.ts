import styled from 'styled-components/native'

interface Props{
  reverse?: boolean;
}

export const Container = styled.TouchableOpacity<Props>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => (props) => props.reverse ? theme.colors.text_color : theme.colors.primary_color};
  margin-bottom: 8px;
  border-radius: 8px;
`

export const Title = styled.Text<Props>`
    font-size: 15px;
    color: ${({ theme }) => (props) => props.reverse ?  theme.colors.primary_color : theme.colors.text_color};
`