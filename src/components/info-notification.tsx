import React, { FunctionComponent, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { ReactComponent as Question } from '../images/question-solid.svg'
import { Notification } from './notification'

interface InfoNotificationProps {}

export const InfoNotifcation: FunctionComponent<InfoNotificationProps> = ({ children }) => {
  const themeContext = useContext(ThemeContext)
  return (
    <Notification
      icon={<Question height="80px" color="#FFF" />}
      content={children}
      backgroundColour={themeContext.colors.info}
    />
  )
}
