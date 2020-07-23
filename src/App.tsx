import React, { Component } from 'react'

import { getFileUrl, intensifyImage, removeBackground, imageToBase64, scaleImage, loadImage } from './utils/image'
import { isRemoveBgRateLimited } from './utils/is-remove-bg-rate-limited'
import { IntensifyImage } from './components/intensify-image'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { TextBlock } from './components/text-block'
import { Link } from './components/link'

import styled, { ThemeProvider } from 'styled-components'
import { AppTheme } from './App-theme'

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

interface AppState {
  intensifiedImage?: HTMLImageElement
  scaledImage?: HTMLImageElement
  isLoading: boolean
  hasError: boolean
  intensity: number
  processingMessage: string
  useRemoveBg: boolean
  removeBgRateLimited: boolean
}

interface AppProps {}

class App extends Component<AppProps, AppState> {
  public readonly state: Readonly<AppState> = {
    intensifiedImage: undefined,
    scaledImage: undefined,
    isLoading: false,
    hasError: false,
    intensity: 25,
    processingMessage: '',
    useRemoveBg: false,
    removeBgRateLimited: false,
  }

  componentDidMount = () => {
    isRemoveBgRateLimited().then((isRateLimited) => this.setState({ removeBgRateLimited: isRateLimited }))
  }

  onRemoveBackgroundChanged = (isChecked: boolean) => this.setState({ useRemoveBg: isChecked })

  intensify = async (img: HTMLImageElement, intensity: number) => {
    try {
      this.setState({ processingMessage: 'Intensifying...' })
      const intensifiedImage = await intensifyImage(img, intensity)
      this.setState({ intensifiedImage, isLoading: false, processingMessage: '' })
    } catch (error) {
      this.setState({ hasError: true })
      console.log(error)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  onIntensityChange = (intensity: number) => {
    this.setState({ intensity })
  }

  onIntensityChanged = (intensity: number) => {
    const { scaledImage } = this.state
    this.setState({ intensity })
    if (scaledImage) {
      this.intensify(scaledImage, intensity)
    }
  }

  onImageSelected = async (files?: FileList) => {
    const { intensity, useRemoveBg } = this.state

    if (files) {
      const file = files.item(0)
      if (file) {
        try {
          this.setState({ isLoading: true, processingMessage: 'Loading image...' })
          const originalImage = await loadImage(getFileUrl(file))
          this.setState({ processingMessage: 'Scaling image...' })
          let scaledImage = await scaleImage(originalImage)
          if (useRemoveBg) {
            this.setState({ isLoading: true, processingMessage: 'Converting to base64...' })
            const base64Image = await imageToBase64(scaledImage.src)
            this.setState({ processingMessage: 'Removing background...' })
            scaledImage = await removeBackground(base64Image)
          }
          this.intensify(scaledImage, intensity)
          this.setState({ scaledImage })
        } catch (error) {
          this.setState({ hasError: true })
          console.log(error)
        } finally {
          this.setState({ isLoading: false })
        }
      }
    }
  }

  render() {
    const {
      intensifiedImage,
      isLoading,
      processingMessage,
      useRemoveBg,
      removeBgRateLimited,
      hasError,
      intensity,
    } = this.state

    return (
      <ThemeProvider theme={AppTheme}>
        <AppBody>
          <Header />
          <IntensifyImage
            isLoading={isLoading}
            processingMessage={processingMessage}
            onImageSelected={this.onImageSelected}
            onRemoveBackgroundChanged={this.onRemoveBackgroundChanged}
            onIntensityChanged={this.onIntensityChanged}
            onIntensityChange={this.onIntensityChange}
            intensifiedImage={intensifiedImage}
            useRemoveBg={useRemoveBg}
            hasError={hasError}
            isRemoveBgDisabled={removeBgRateLimited}
            intensity={intensity}
          />
          <Footer>
            <TextBlock>
              Create a silly slack emoji that bounces around with a transparent background just by upload an image. For
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
      </ThemeProvider>
    )
  }
}

export default App
