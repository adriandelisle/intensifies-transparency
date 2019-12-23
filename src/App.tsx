import React, { Component, FunctionComponent } from 'react'
import logo from './images/atreides-yelling.png'
import './App.css'
import Animated_GIF from 'gif-transparency'
import { getFileUrl, loadImage } from './utils/image'

interface GifSelectorProps {
  onFileSelected: (files: FileList | null) => void
}

const GifSelector: FunctionComponent<GifSelectorProps> = ({
  onFileSelected,
}: GifSelectorProps) => (
  <div className="gifSelector">
    <label htmlFor="GifSelector">Select an image to intensify</label>
    <input
      type="file"
      accept="image/*"
      onChange={e => onFileSelected(e.target.files)}
      name="GifSelector"
      id="GifSelector"
    />
  </div>
)

interface PreviewImageProps {
  url: string
}

const PreviewImage: FunctionComponent<PreviewImageProps> = ({
  url,
}: PreviewImageProps) => <img src={url} alt="Preview of uploaded file" />

interface AppState {
  selectedImage: File | null
}

interface AppProps {}

class App extends Component<AppProps, AppState> {
  public readonly state: Readonly<AppState> = {
    selectedImage: null,
  }

  onImageSelected = async (files: FileList | null) => {
    if (files) {
      const file = files.item(0)
      if (file) {
        this.setState({ selectedImage: files.item(0) })
        const img = await loadImage(getFileUrl(file))
        const { height, width } = img
        const canvas = document.createElement('canvas')
        canvas.height = height
        canvas.width = width
        const context = canvas.getContext('2d')
        if (context) {
          const gif = new Animated_GIF({
            repeat: 0,
            width,
            height,
            disposal: 2,
          })
          gif.setDelay(30)

          context.drawImage(img, 0, 0)
          gif.addFrameImageData(context.getImageData(0, 0, width, height))

          context.clearRect(0, 0, width, height)
          context.translate(50, 50)
          context.drawImage(img, 0, 0)
          gif.addFrameImageData(context.getImageData(0, 0, width, height))

          gif.getBlobGIF(async (gifData: Blob) => {
            const gifImage = await loadImage(URL.createObjectURL(gifData))
            document.body.appendChild(gifImage)
          })
        }
      }
    }
  }

  render() {
    const { selectedImage } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <PreviewImage
            url={selectedImage ? getFileUrl(selectedImage) : logo}
          />
          <GifSelector onFileSelected={this.onImageSelected} />
        </header>
      </div>
    )
  }
}

export default App
