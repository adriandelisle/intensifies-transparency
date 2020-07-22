import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const StyledAnchor = styled.a`
  :link {
    color: white;
  }

  :visited {
    color: pink;
  }

  /* :focus {
  } */

  :hover {
    text-decoration: none;
  }

  /* :active {
  } */
`

interface LinkProps {
  url: string
  text: string
}

export const Link: FunctionComponent<LinkProps> = ({ url, text }) => (
  <StyledAnchor href={url} rel="noreferrer noopener" target="_blank">
    {text}
  </StyledAnchor>
)
