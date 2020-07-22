import React, { FunctionComponent } from 'react'
// import styled from 'styled-components'

interface IntensitySliderProps {
  onChange: (value: number) => void
}

export const IntensitySlider: FunctionComponent<IntensitySliderProps> = ({ onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="25"
      step="1"
      defaultValue="25"
      onChange={(e) => onChange(parseInt(e.target.value))}
    />
  )
}
