import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'

interface ContainerProps {
  backgroundColour: string
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background-color: ${(props) => transparentize(0.5, props.backgroundColour)};
  border: 1px solid black;
  padding: 8px 4px;
  margin: 0 0 16px 0;
`
const Message = styled.div`
  margin-left: 8px;
`

interface NotificationProps {
  icon: React.ReactNode
  content: React.ReactNode
  backgroundColour: string
}

export const Notification: FunctionComponent<NotificationProps> = ({ icon, content, backgroundColour }) => (
  <Container backgroundColour={backgroundColour}>
    {icon}
    <Message>{content}</Message>
  </Container>
)
