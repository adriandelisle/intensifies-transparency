import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { ReactComponent as Question } from '../images/question-solid.svg'

const InfoTextContainer = styled.div`
  display: flex;
  align-items: bottom;
`
const InfoTextMessage = styled.div`
  margin-left: 8px;
`

interface InfoTextProps {}

export const InfoText: FunctionComponent<InfoTextProps> = ({ children }) => (
  <InfoTextContainer>
    <Question height="16px" color="#00FF00" />
    <InfoTextMessage>{children}</InfoTextMessage>
  </InfoTextContainer>
)
