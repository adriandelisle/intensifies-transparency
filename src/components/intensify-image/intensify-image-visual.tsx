import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { GifSelector } from '../gif-selector'
import { ImagePreview } from '../image-preview'
import { LoadingIndicator } from '../loading-indicator'
import { Checkbox } from '../checkbox'
import { IntensitySlider } from '../intensity-slider'
import { InfoNotifcation } from '../info-notification'
import { ErrorNotifcation } from '../error-notification'
import { Link } from '../link'

const IntensifyImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ControlsContainer = styled.div``

const InfoContainer = styled.div`
  max-width: 450px;
`

interface IntensifyImageVisualProps {
  intensifiedImage?: HTMLImageElement
  isLoading: boolean
  processingMessage: string
  hasError: boolean
  onImageSelected: (files?: FileList) => void
  onRemoveBackgroundChanged: (isChecked: boolean) => void
  onIntensityChanged: (value: number) => void
  onIntensityChange: (value: number) => void
  useRemoveBg: boolean
  isRemoveBgDisabled: boolean
  intensity: number
}

const IntensifyImageVisual: FunctionComponent<IntensifyImageVisualProps> = ({
  intensifiedImage,
  isLoading,
  processingMessage,
  hasError,
  onImageSelected,
  onRemoveBackgroundChanged,
  onIntensityChanged,
  onIntensityChange,
  useRemoveBg,
  isRemoveBgDisabled,
  intensity,
}) => {
  return (
    <IntensifyImageContainer>
      {intensifiedImage?.src && !isLoading ? <ImagePreview url={intensifiedImage?.src} /> : null}
      {isLoading ? <LoadingIndicator /> : null}
      {processingMessage}
      <GifSelector onFileSelected={onImageSelected} />
      <InfoContainer>
        {hasError ? <ErrorNotifcation>Something when wrong please refresh and try again.</ErrorNotifcation> : ''}
        {isRemoveBgDisabled ? (
          <InfoNotifcation>
            Can't access the <Link url="https://www.remove.bg/" text="remove.bg" /> API right now, please remove the
            background manually.
          </InfoNotifcation>
        ) : null}
      </InfoContainer>
      <ControlsContainer>
        <Checkbox
          name="UseRemoveBg"
          label="Remove background automatically"
          onChecked={onRemoveBackgroundChanged}
          isChecked={useRemoveBg}
          disabled={isRemoveBgDisabled}
        />
        <IntensitySlider onChange={onIntensityChange} onChangeComplete={onIntensityChanged} value={intensity} />
      </ControlsContainer>
    </IntensifyImageContainer>
  )
}

export { IntensifyImageVisual }
