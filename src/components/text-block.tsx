import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const StyledTextBlock = styled.p`
  margin: 4px 0;
`

interface TextBlockProps {}

export const TextBlock: FunctionComponent<TextBlockProps> = ({ children }) => (
  <StyledTextBlock>{children}</StyledTextBlock>
)
