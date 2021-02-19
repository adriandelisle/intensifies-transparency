import React, { FunctionComponent } from 'react'

// theming
import styled, { ThemeProvider } from 'styled-components'
import { AppTheme } from './App-theme'

// context
import { AppProvider } from './contexts/app-context'

// components
import { IntensifyImage } from './components/intensify-image/'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { TextBlock } from './components/text-block'
import { Link } from './components/link'

const AppBody = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${(props) => props.theme.font};
  color: white;
`

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <AppProvider>
        <AppBody>
          <Header />
          <IntensifyImage />
          <Footer>
            <TextBlock>
              Create a silly slack emoji that bounces around with a transparent background just by uploading an image. For
              best results use <Link url="https://www.remove.bg/" text="remove.bg" /> to remove the background and use a
              downscaled image.
            </TextBlock>
            <TextBlock>
              Made by: Adrian De Lisle.{' '}
              <Link url="https://github.com/adriandelisle/intensifies-transparency" text="Source on GitHub" />
            </TextBlock>
            <TextBlock>
              Uses <Link url="https://fontawesome.com/license" text="Font Awesome Icons" />
            </TextBlock>
          </Footer>
        </AppBody>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
