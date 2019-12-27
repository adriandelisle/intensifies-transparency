import React, { Component, FunctionComponent } from 'react'
import logo from './images/atreides-yelling.png'
import './App.css'
import { getFileUrl, loadImage, intensifyImage } from './utils/image'

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
        const intensifiedImage = await intensifyImage(img)
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
