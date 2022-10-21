import React from 'react';
import { TouchableOpacityProps } from 'react-native'

import { 
    Container,
    Title
 } from './styles'

interface Props extends TouchableOpacityProps{
    title: string;
    reverse?: boolean;
}

export default function Button({title, reverse, ...rest}: Props){
    return(
        <Container reverse={reverse} {...rest} activeOpacity={0.55}>
            <Title reverse={reverse}> {title}</Title>
        </Container>
    );
}