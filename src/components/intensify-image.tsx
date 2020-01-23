import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { GifSelector } from './gif-selector'
import { ImagePreview } from './image-preview'
import { LoadingIndicator } from './loading-indicator'

const IntensifyImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

interface IntensifyImageProps {
  intensifiedImage?: HTMLImageElement
  isLoading: Boolean
  onImageSelected: (files?: FileList) => void
}

const IntensifyImage: FunctionComponent<IntensifyImageProps> = ({
  intensifiedImage,
  isLoading,
  onImageSelected,
}) => {
  return (
    <IntensifyImageContainer>
      {isLoading ? <LoadingIndicator /> : null}
      {intensifiedImage?.src ? (
        <ImagePreview url={intensifiedImage?.src} />
      ) : null}
      <GifSelector onFileSelected={onImageSelected} />
    </IntensifyImageContainer>
  )
}

export { IntensifyImage }
