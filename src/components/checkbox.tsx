import React, { FunctionComponent } from 'react'
import { AppTheme } from '../App-theme'
import styled, { ThemeProvider } from 'styled-components'

const StyledLabel = styled.label``

const StyledInput = styled.input``

const CheckboxContainer = styled.div``

interface CheckboxProps {
  onChecked: (checked: boolean) => void
  name: string
  label: string
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({ onChecked, name, label }: CheckboxProps) => (
  <CheckboxContainer>
    <ThemeProvider theme={AppTheme}>
      <StyledInput type="checkbox" onChange={(e) => onChecked(Boolean(e.target.checked))} name={name} id={name} />
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
    </ThemeProvider>
  </CheckboxContainer>
)
