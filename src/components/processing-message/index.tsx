import React, { FunctionComponent } from 'react'

import { useAppState } from '../../contexts/app-context'

interface ProcessingMessageProps {}

const ProcessingMessage: FunctionComponent<ProcessingMessageProps> = () => {
  const { processingMessage } = useAppState()

  return <span>{processingMessage}</span>
}

export { ProcessingMessage }
