import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label``

const StyledInput = styled.input``

const CheckboxContainer = styled.div``

interface CheckboxProps {
  onChecked: (checked: boolean) => void
  name: string
  label: string
  disabled: boolean
  isChecked: boolean
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  onChecked,
  name,
  label,
  isChecked,
  disabled,
}: CheckboxProps) => (
  <CheckboxContainer>
    <StyledInput
      type="checkbox"
      onChange={(e) => onChecked(Boolean(e.target.checked))}
      name={name}
      id={name}
      checked={isChecked && !disabled}
      disabled={disabled}
    />
    <StyledLabel htmlFor={name}>{label}</StyledLabel>
  </CheckboxContainer>
)
