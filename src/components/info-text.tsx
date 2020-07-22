import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { ReactComponent as Question } from '../images/question-solid.svg'
import { transparentize } from 'polished'

const InfoTextContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => transparentize(0.5, props.theme.colors.info)};
  border: 1px solid black;
  padding: 8px 4px;
  margin: 0 0 16px 0;
`
const InfoTextMessage = styled.div`
  margin-left: 8px;
`

interface InfoTextProps {}

export const InfoText: FunctionComponent<InfoTextProps> = ({ children }) => (
  <InfoTextContainer>
    <Question height="80px" color="#FFF" />
    <InfoTextMessage>{children}</InfoTextMessage>
  </InfoTextContainer>
)
