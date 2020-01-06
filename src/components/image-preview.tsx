import React, { FunctionComponent } from 'react'

interface ImagePreviewProps {
  url: string
}

export const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
  url,
}: ImagePreviewProps) => <img src={url} alt="Preview of uploaded file" />
