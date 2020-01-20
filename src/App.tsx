import React, { Component } from 'react'
import { getFileUrl, loadImage, intensifyImage } from './utils/image'
import { GifSelector } from './components/gif-selector'
import { ImagePreview } from './components/image-preview'

import styled from 'styled-components'

interface AppState {
  selectedImage?: File
  intensifiedImage?: HTMLImageElement
}

interface AppProps {}

const AppBody = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', Courier, monospace;
  color: white;
`

class App extends Component<AppProps, AppState> {
  public readonly state: Readonly<AppState> = {
    selectedImage: undefined,
    intensifiedImage: undefined,
  }

  onImageSelected = async (files?: FileList) => {
    if (files) {
      const file = files.item(0)
      if (file) {
        this.setState({ selectedImage: file })
        const img = await loadImage(getFileUrl(file))
        const intensifiedImage = await intensifyImage(img)
        this.setState({ intensifiedImage })
      }
    }
  }

  render() {
    const { intensifiedImage } = this.state

    return (
      <AppBody>
        {intensifiedImage?.src ? (
          <ImagePreview url={intensifiedImage?.src} />
        ) : null}
        <GifSelector onFileSelected={this.onImageSelected} />
      </AppBody>
    )
  }
}

export default App
