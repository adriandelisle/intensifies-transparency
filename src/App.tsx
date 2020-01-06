import React, { Component } from 'react'
import logo from './images/atreides-yelling.png'
import './App.css'
import { getFileUrl, loadImage, intensifyImage } from './utils/image'
import { GifSelector } from './components/gif-selector'
import { ImagePreview } from './components/image-preview'

interface AppState {
  selectedImage: File | null
  intensifiedImage: HTMLImageElement | null
}

interface AppProps {}

class App extends Component<AppProps, AppState> {
  public readonly state: Readonly<AppState> = {
    selectedImage: null,
    intensifiedImage: null,
  }

  onImageSelected = async (files: FileList | null) => {
    if (files) {
      const file = files.item(0)
      if (file) {
        this.setState({ selectedImage: files.item(0) })
        const img = await loadImage(getFileUrl(file))
        const intensifiedImage = await intensifyImage(img)
        this.setState({ intensifiedImage })
      }
    }
  }

  render() {
    const { intensifiedImage } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <ImagePreview
            url={intensifiedImage?.src ? intensifiedImage.src : logo}
          />
          <GifSelector onFileSelected={this.onImageSelected} />
        </header>
      </div>
    )
  }
}

export default App
