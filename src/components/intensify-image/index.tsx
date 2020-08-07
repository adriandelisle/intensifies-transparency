import React, { FunctionComponent } from 'react'

import { useAppState, useAppDispatch, imageSelected, intensityChanged } from '../../contexts/app-context'

import { IntensifyImageVisual } from './intensify-image-visual'

interface IntensifyImageProps {}

const IntensifyImage: FunctionComponent<IntensifyImageProps> = (props) => {
  const {
    processingMessage,
    intensity,
    useRemoveBg,
    intensifiedImage,
    isLoading,
    hasError,
    scaledImage,
    removeBgRateLimited,
  } = useAppState()
  const appDispatch = useAppDispatch()
  const onImageSelected = (files?: FileList) => {
    imageSelected(appDispatch, intensity, useRemoveBg, files)
  }

  return (
    <IntensifyImageVisual
      {...props}
      isRemoveBgDisabled={removeBgRateLimited}
      onRemoveBackgroundChanged={(isChecked: boolean) => appDispatch({ type: 'useRemoveBg', useRemoveBg: isChecked })}
      onIntensityChange={(value: number) => appDispatch({ type: 'intensityChange', intensity: value })}
      onIntensityChanged={(value: number) => intensityChanged(appDispatch, intensity, scaledImage)}
      intensity={intensity}
      isLoading={isLoading}
      hasError={hasError}
      useRemoveBg={useRemoveBg}
      intensifiedImage={intensifiedImage}
      onImageSelected={onImageSelected}
      processingMessage={processingMessage}
    />
  )
}

export { IntensifyImage }
