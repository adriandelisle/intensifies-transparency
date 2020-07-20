import React, { Component } from 'react'
import { getFileUrl, loadImage, intensifyImage } from './utils/image'
import { IntensifyImage } from './components/intensify-image'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { Link } from './components/link'

import styled, { ThemeProvider } from 'styled-components'
import { AppTheme } from './App-theme'

interface AppState {
  intensifiedImage?: HTMLImageElement
  isLoading: Boolean
}

interface AppProps {}

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

class App extends Component<AppProps, AppState> {
  public readonly state: Readonly<AppState> = {
    intensifiedImage: undefined,
    isLoading: false,
  }

  onImageSelected = async (files?: FileList) => {
    if (files) {
      const file = files.item(0)
      if (file) {
        this.setState({ isLoading: true })
        const img = await loadImage(getFileUrl(file))
        const intensifiedImage = await intensifyImage(img)
        this.setState({ intensifiedImage, isLoading: false })
      }
    }
  }

  render() {
    const { intensifiedImage, isLoading } = this.state

    return (
      <ThemeProvider theme={AppTheme}>
        <AppBody>
          <Header />
          <IntensifyImage
            isLoading={isLoading}
            onImageSelected={this.onImageSelected}
            intensifiedImage={intensifiedImage}
          />
          <Footer>
            To create a silly slack emoji that bounces around with a transparent background just upload an image. For
            best results use <Link url="https://www.remove.bg/" text="https://www.remove.bg/" /> to remove the
            background and use a downscaled image.{' '}
            <Link url="https://github.com/adriandelisle/intensifies-transparency" text="Source" />
          </Footer>
        </AppBody>
      </ThemeProvider>
    )
  }
}

export default App
