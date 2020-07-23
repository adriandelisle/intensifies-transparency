import React, { FunctionComponent, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { ReactComponent as Exclamation } from '../images/exclamation-triangle-solid.svg'
import { Notification } from './notification'

interface ErrorNotificationProps {}

export const ErrorNotifcation: FunctionComponent<ErrorNotificationProps> = ({ children }) => {
  const themeContext = useContext(ThemeContext)
  return (
    <Notification
      icon={<Exclamation height="80px" color="#FFF" />}
      content={children}
      backgroundColour={themeContext.colors.error}
    />
  )
}
