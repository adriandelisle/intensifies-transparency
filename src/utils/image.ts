import Animated_GIF from 'gif-transparency'
import { RemoveBgResult, removeBackgroundFromImageBase64, RemoveBgBase64Options } from 'remove.bg'

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

export const imageToBase64: (url: string) => Promise<string> = async (url: string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result?.toString()
      resolve(result)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export const removeBackground: (base64Image: string) => Promise<HTMLImageElement> = async (base64Image: string) => {
  const options: RemoveBgBase64Options = {
    base64img: base64Image,
    apiKey: 'a7X59GiZEEBMi8ReqEgRbxuJ', // normally this shouldn't be in here, but its just a free account and for demo purposes
    format: 'png',
    size: 'preview',
    type: 'auto',
  }

  const result: RemoveBgResult = await removeBackgroundFromImageBase64(options)

  return loadImage(`data:image/jpeg;base64,${result?.base64img}`)
}

export const scaleImage: (image: HTMLImageElement, maxWidth?: number) => Promise<HTMLImageElement> = (
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
  if (context) {
    context.drawImage(image, 0, 0, imgWidth, imgHeight, 0, 0, width, height)
  }

  return loadImage(canvas.toDataURL())
}

export const intensifyImage: (image: HTMLImageElement) => Promise<HTMLImageElement> = async (
  image: HTMLImageElement
) => {
  const imgHeight = image.height
  const imgWidth = image.width
  const width = image.width
  const height = image.height

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
