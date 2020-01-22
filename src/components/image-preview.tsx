import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const ImagePreviewContainer = styled.div`
  margin: 10px;
`

const CheckeredBackground = styled.div`
  background-image: /* tint image */ linear-gradient(
      to right,
      rgba(192, 192, 192, 0.75),
      rgba(192, 192, 192, 0.75)
    ),
    /* checkered effect */ linear-gradient(to right, black 50%, white 50%),
    linear-gradient(to bottom, black 50%, white 50%);
  background-blend-mode: normal, difference, normal;
  background-size: 2em 2em;
`

interface ImagePreviewProps {
  url: string
}

export const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
  url,
}: ImagePreviewProps) => (
  <ImagePreviewContainer>
    <CheckeredBackground>
      <img src={url} alt="Preview of uploaded file" />
    </CheckeredBackground>
  </ImagePreviewContainer>
)
