import Animated_GIF from 'gif-transparency'

export const getFileUrl: (file: File) => string = (file: File) => URL.createObjectURL(file)

export const loadImage: (url: string) => Promise<HTMLImageElement> = (url: string) => {
  const img = new Image()
  const imgPromise = new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = url
  })
  return imgPromise
}

export const intensifyImage: (image: HTMLImageElement, maxWidth?: number) => Promise<HTMLImageElement> = async (
  image: HTMLImageElement,
  maxWidth: number = 300
) => {
  // scaling image to max with
  const imgHeight = image.height
  const imgWidth = image.width
  const width = Math.min(imgWidth, maxWidth)
  const aspectRatio = imgWidth / imgHeight
  const height = Math.floor(width / aspectRatio)

  const canvas = document.createElement('canvas')
  canvas.height = height
  canvas.width = width
  const context = canvas.getContext('2d')
  const maybeGifBlob = new Promise<HTMLImageElement>((resolve, reject) => {
    if (context) {
      try {
        const intensifyConfig = {
          frames: 6,
          magnitude: 25,
          delay: 60,
        }
        const gif = new Animated_GIF({
          repeat: 0,
          width,
          height,
          disposal: 2,
        })
        gif.setDelay(intensifyConfig.delay)

        for (let i = 0; i < intensifyConfig.frames; i++) {
          const direction = i % 2 === 0 ? 1 : -1
          context.clearRect(0, 0, width, height)
          const x = Math.random() * intensifyConfig.magnitude * direction
          const y = Math.random() * intensifyConfig.magnitude * direction
          context.translate(x, y)
          context.drawImage(image, 0, 0, imgWidth, imgHeight, 0, 0, width, height)
          gif.addFrameImageData(context.getImageData(0, 0, width, height))
        }

        gif.getBlobGIF(async (gifData: Blob) => {
          const gifImage = await loadImage(URL.createObjectURL(gifData))
          resolve(gifImage)
        })
      } catch (e) {
        reject(e)
      }
    } else {
      reject('Context not found')
    }
  })

  return maybeGifBlob
}
