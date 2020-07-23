import React, { FunctionComponent } from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as Check } from '../images/check-solid.svg'

interface CheckboxContainerProps {
  disabled: boolean
}

const CheckboxContainer = styled.div<CheckboxContainerProps>`
  user-select: none;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`

const StyledLabel = styled.label`
  cursor: pointer;
`

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

interface StyledCheckboxProps {
  checked: boolean
  disabled: boolean
}

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  cursor: pointer;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: text-top;
  text-align: center;
  background: ${(props) => props.theme.colors.buttons.action.main};
  transition: all 150ms;

  ${(props) =>
    !props.disabled
      ? css`
          :hover {
            transform: translate(4px, -4px);
            box-shadow: -1px 1px ${(props) => props.theme.colors.buttons.action.hover},
              -2px 2px ${(props) => props.theme.colors.buttons.action.hover},
              -3px 3px ${(props) => props.theme.colors.buttons.action.hover},
              -4px 4px ${(props) => props.theme.colors.buttons.action.hover};
          }
        `
      : ''}

  ${HiddenCheckbox}:focus + & {
    transform: translate(4px, -4px);
    box-shadow: -1px 1px ${(props) => props.theme.colors.buttons.action.hover},
      -2px 2px ${(props) => props.theme.colors.buttons.action.hover},
      -3px 3px ${(props) => props.theme.colors.buttons.action.hover},
      -4px 4px ${(props) => props.theme.colors.buttons.action.hover};
  }
`

const StyledCheck = styled(Check)`
  height: 14px;
  width: 14px;
  color: ${(props) => props.theme.colors.buttons.action.text};
`

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
}: CheckboxProps) => {
  const checked = isChecked && !disabled
  return (
    <CheckboxContainer disabled={disabled}>
      <StyledLabel htmlFor={name}>
        <HiddenCheckbox
          type="checkbox"
          onChange={(e) => onChecked(Boolean(e.target.checked))}
          name={name}
          id={name}
          checked={checked}
          disabled={disabled}
        />
        <StyledCheckbox checked={checked} disabled={disabled}>
          {checked ? <StyledCheck /> : null}
        </StyledCheckbox>
        {label}
      </StyledLabel>
    </CheckboxContainer>
  )
}
