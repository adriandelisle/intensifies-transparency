import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

const IntensitySliderContainer = styled.div`
  margin: 16px 0;
`

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`

const InputRangeContainer = styled.div`
  .input-range__track--active {
    background: ${(props) => props.theme.colors.buttons.action.hover};
    border-color: ${(props) => props.theme.colors.buttons.action.hover};
  }

  .input-range__slider {
    background: ${(props) => props.theme.colors.buttons.action.main};
    border-color: ${(props) => props.theme.colors.buttons.action.main};
    border-radius: 0;
    border: 1px solid black;

    :hover {
      transform: translate(4px, -4px);
      box-shadow: -1px 1px ${(props) => props.theme.colors.buttons.action.hover},
        -2px 2px ${(props) => props.theme.colors.buttons.action.hover},
        -3px 3px ${(props) => props.theme.colors.buttons.action.hover},
        -4px 4px ${(props) => props.theme.colors.buttons.action.hover};
    }
  }
`

interface IntensitySliderProps {
  onChange: (value: number) => void
  onChangeComplete: (value: number) => void
  value: number
}

export const IntensitySlider: FunctionComponent<IntensitySliderProps> = ({ onChange, onChangeComplete, value }) => {
  const name = 'IntensitySlider'
  return (
    <IntensitySliderContainer>
      <StyledLabel htmlFor={name}>Intensity</StyledLabel>
      <InputRangeContainer>
        <InputRange
          name={name}
          minValue={0}
          maxValue={25}
          step={1}
          value={value}
          formatLabel={() => ''}
          onChangeComplete={(value) => {
            if (typeof value === 'number') {
              onChangeComplete(value)
            }
          }}
          onChange={(value) => {
            if (typeof value === 'number') {
              onChange(value)
            }
          }}
        />
      </InputRangeContainer>
    </IntensitySliderContainer>
  )
}
