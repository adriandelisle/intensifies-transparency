import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
  background-color: #09d3ac;
  color: #282c34;
  cursor: pointer;

  :hover {
    background-color: #09d3ac45;
    color: #282c34;
  }
`

const StyledInput = styled.input`
  opacity: 0;
  display: none;
`

interface GifSelectorProps {
  onFileSelected: (files?: FileList) => void
}

export const GifSelector: FunctionComponent<GifSelectorProps> = ({
  onFileSelected,
}: GifSelectorProps) => (
  <div className="gifSelector">
    <StyledLabel htmlFor="GifSelector">
      Select an image to intensify
    </StyledLabel>
    <StyledInput
      type="file"
      accept="image/*"
      onChange={e => onFileSelected(e.target.files || undefined)}
      name="GifSelector"
      id="GifSelector"
    />
  </div>
)
