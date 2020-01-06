import React, { FunctionComponent } from 'react'

interface GifSelectorProps {
  onFileSelected: (files: FileList | null) => void
}

export const GifSelector: FunctionComponent<GifSelectorProps> = ({
  onFileSelected,
}: GifSelectorProps) => (
  <div className="gifSelector">
    <label htmlFor="GifSelector">Select an image to intensify</label>
    <input
      type="file"
      accept="image/*"
      onChange={e => onFileSelected(e.target.files)}
      name="GifSelector"
      id="GifSelector"
    />
  </div>
)
