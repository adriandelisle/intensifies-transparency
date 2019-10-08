import React, { Component, FunctionComponent } from "react"
import logo from "./logo.svg"
import "./App.css"

interface GifSelectorProps {
  onFileSelected: (files: FileList | null) => void
}

const GifSelector: FunctionComponent<GifSelectorProps> = ({
  onFileSelected
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
  url
}: PreviewImageProps) => (
  <img src={url} className="App-logo" alt="Preview of uploaded image" />
)

const getFileUrl: (file: File) => string = (file: File) =>
  URL.createObjectURL(file)

interface AppState {
  selectedImage: File | null
}

interface AppProps {}

class App extends Component<AppProps, AppState> {
  public readonly state: Readonly<AppState> = {
    selectedImage: null
  }

  onImageSelected = (files: FileList | null) => {
    if (files) {
      this.setState({ selectedImage: files.item(0) })
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
