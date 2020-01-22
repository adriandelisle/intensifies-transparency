import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  margin-top: auto;
  text-align: center;
  padding: 14px;
`

interface FooterProps {}

export const Footer: FunctionComponent<FooterProps> = ({ children }) => (
  <FooterContainer>{children}</FooterContainer>
)
