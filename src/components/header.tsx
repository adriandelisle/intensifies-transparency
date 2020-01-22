import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  margin-bottom: auto;
`

interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = ({ children }) => (
  <HeaderContainer>{children}</HeaderContainer>
)
