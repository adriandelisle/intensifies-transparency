import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { GifSelector } from './gif-selector'
import { ImagePreview } from './image-preview'
import { LoadingIndicator } from './loading-indicator'
import { Checkbox } from './checkbox'
import { InfoText } from './info-text'
import { Link } from './link'

const IntensifyImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

interface IntensifyImageProps {
  intensifiedImage?: HTMLImageElement
  isLoading: boolean
  onImageSelected: (files?: FileList) => void
  onRemoveBackgroundChanged: (isChecked: boolean) => void
  useRemoveBg: boolean
  isRemoveBgDisabled: boolean
}

const IntensifyImage: FunctionComponent<IntensifyImageProps> = ({
  intensifiedImage,
  isLoading,
  onImageSelected,
  onRemoveBackgroundChanged,
  useRemoveBg,
  isRemoveBgDisabled,
}) => {
  return (
    <IntensifyImageContainer>
      {isLoading ? <LoadingIndicator /> : null}
      {intensifiedImage?.src ? <ImagePreview url={intensifiedImage?.src} /> : null}
      <GifSelector onFileSelected={onImageSelected} />
      {isRemoveBgDisabled ? (
        <InfoText>
          Can't access the <Link url="https://www.remove.bg/" text="remove.bg" /> API right now, please remove the
          background manually
        </InfoText>
      ) : null}
      <Checkbox
        name="UseRemoveBg"
        label="Remove background automatically"
        onChecked={onRemoveBackgroundChanged}
        isChecked={useRemoveBg}
        disabled={isRemoveBgDisabled}
      />
    </IntensifyImageContainer>
  )
}

export { IntensifyImage }
