import React, { Component } from 'react'
import { getFileUrl, loadImage, intensifyImage } from './utils/image'
import { GifSelector } from './components/gif-selector'
import { ImagePreview } from './components/image-preview'
import { LoadingIndicator } from './components/loading-indicator'

import styled, { ThemeProvider } from 'styled-components'
import { AppTheme } from './App-theme'

interface AppState {
  selectedImage?: File
  intensifiedImage?: HTMLImageElement
  isLoading: Boolean
}

interface AppProps {}

const AppBody = styled.div`
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.font};
  color: white;
`

class App extends Component<AppProps, AppState> {
  public readonly state: Readonly<AppState> = {
    selectedImage: undefined,
    intensifiedImage: undefined,
    isLoading: false,
  }

  onImageSelected = async (files?: FileList) => {
    if (files) {
      const file = files.item(0)
      if (file) {
        this.setState({ selectedImage: file, isLoading: true })
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
          {isLoading ? <LoadingIndicator /> : null}
          {intensifiedImage?.src ? (
            <ImagePreview url={intensifiedImage?.src} />
          ) : null}
          <GifSelector onFileSelected={this.onImageSelected} />
        </AppBody>
      </ThemeProvider>
    )
  }
}

export default App
