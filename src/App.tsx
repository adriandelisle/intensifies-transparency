import React, { Component } from 'react'
import { getFileUrl, intensifyImage, removeBackground, imageToBase64, scaleImage, loadImage } from './utils/image'
import { isRemoveBgRateLimited } from './utils/is-remove-bg-rate-limited'
import { IntensifyImage } from './components/intensify-image'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { Link } from './components/link'

import styled, { ThemeProvider } from 'styled-components'
import { AppTheme } from './App-theme'

interface AppState {
  intensifiedImage?: HTMLImageElement
  isLoading: boolean
  hasError: boolean
  processingMessage: string
  useRemoveBg: boolean
  removeBgRateLimited: boolean
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
    hasError: false,
    processingMessage: '',
    useRemoveBg: false,
    removeBgRateLimited: false,
  }

  componentDidMount = () => {
    isRemoveBgRateLimited().then((isRateLimited) => this.setState({ removeBgRateLimited: isRateLimited }))
  }

  onRemoveBackgroundChanged = (isChecked: boolean) => this.setState({ useRemoveBg: isChecked })

  onImageSelected = async (files?: FileList) => {
    const { useRemoveBg } = this.state

    if (files) {
      const file = files.item(0)
      if (file) {
        try {
          this.setState({ isLoading: true, processingMessage: 'Loading image...' })
          const originalImage = await loadImage(getFileUrl(file))
          this.setState({ processingMessage: 'Scaling image...' })
          const scaledImage = await scaleImage(originalImage)
          let img = scaledImage
          if (useRemoveBg) {
            this.setState({ processingMessage: 'Converting to base64...' })
            const base64Image = await imageToBase64(scaledImage.src)
            this.setState({ processingMessage: 'Removing background...' })
            img = await removeBackground(base64Image)
          }
          this.setState({ processingMessage: 'Intensifying...' })
          const intensifiedImage = await intensifyImage(img)
          this.setState({ intensifiedImage, isLoading: false, processingMessage: '' })
        } catch (error) {
          this.setState({ hasError: true })
          console.log(error)
        }
      }
    }
  }

  render() {
    const { intensifiedImage, isLoading, processingMessage, useRemoveBg, removeBgRateLimited, hasError } = this.state

    return (
      <ThemeProvider theme={AppTheme}>
        <AppBody>
          <Header />
          <IntensifyImage
            isLoading={isLoading}
            processingMessage={processingMessage}
            onImageSelected={this.onImageSelected}
            onRemoveBackgroundChanged={this.onRemoveBackgroundChanged}
            intensifiedImage={intensifiedImage}
            useRemoveBg={useRemoveBg}
            hasError={hasError}
            isRemoveBgDisabled={removeBgRateLimited}
          />
          <Footer>
            To create a silly slack emoji that bounces around with a transparent background just upload an image. For
            best results use <Link url="https://www.remove.bg/" text="remove.bg" /> to remove the background and use a
            downscaled image. <Link url="https://github.com/adriandelisle/intensifies-transparency" text="Source" />
          </Footer>
        </AppBody>
      </ThemeProvider>
    )
  }
}

export default App
