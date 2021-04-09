import React, { FunctionComponent } from 'react'

import styled from 'styled-components'

import { useAppState } from '../../contexts/app-context'

const StyledAnchor = styled.a`
  display: block;
  padding: 5px 10px;
  margin: 14px;
  background-color: ${(props) => props.theme.colors.buttons.action.main};
  color: ${(props) => props.theme.colors.buttons.action.text};
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;
  border: 1px solid black;
  font-size: calc(10px + 2vmin);
  text-decoration: none;

  :hover {
    transform: translate(8px, -8px);
    box-shadow: -1px 1px ${(props) => props.theme.colors.buttons.action.hover},
      -2px 2px ${(props) => props.theme.colors.buttons.action.hover},
      -3px 3px ${(props) => props.theme.colors.buttons.action.hover},
      -4px 4px ${(props) => props.theme.colors.buttons.action.hover},
      -5px 5px ${(props) => props.theme.colors.buttons.action.hover},
      -6px 6px ${(props) => props.theme.colors.buttons.action.hover},
      -7px 7px ${(props) => props.theme.colors.buttons.action.hover},
      -8px 8px ${(props) => props.theme.colors.buttons.action.hover};
  }
`

interface DownloadButtonProps {}

const DownloadButton: FunctionComponent<DownloadButtonProps> = () => {
  const { intensifiedImage, isLoading, filename } = useAppState()
  const downloadName = `${filename?.split('.')[0]}-intensified`

  return (
    <>
      {intensifiedImage?.src && !isLoading && (
        <StyledAnchor href={intensifiedImage.src} download={downloadName}>
          Download
        </StyledAnchor>
      )}
    </>
  )
}

export { DownloadButton }
