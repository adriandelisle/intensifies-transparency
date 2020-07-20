import React, { FunctionComponent } from 'react'
import { AppTheme } from '../App-theme'
import styled, { ThemeProvider } from 'styled-components'

const StyledLabel = styled.label`
  display: block;
  padding: 5px 10px;
  margin: 14px;
  background-color: ${(props) => props.theme.colors.buttons.action.main};
  color: #282c34;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid black;
  font-size: calc(10px + 2vmin);

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

const StyledInput = styled.input`
  opacity: 0;
  display: none;
`

interface GifSelectorProps {
  onFileSelected: (files?: FileList) => void
}

export const GifSelector: FunctionComponent<GifSelectorProps> = ({ onFileSelected }: GifSelectorProps) => (
  <div className="gifSelector">
    <ThemeProvider theme={AppTheme}>
      <StyledLabel htmlFor="GifSelector">Select an image to intensify</StyledLabel>
    </ThemeProvider>
    <StyledInput
      type="file"
      accept="image/*"
      onChange={(e) => onFileSelected(e.target.files || undefined)}
      name="GifSelector"
      id="GifSelector"
    />
  </div>
)
