export const getFileUrl: (file: File) => string = (file: File) =>
  URL.createObjectURL(file)

export const loadImage: (url: string) => Promise<HTMLImageElement> = (
  url: string
) => {
  const img = new Image()
  const imgPromise = new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = e => reject(e)
    img.src = url
  })
  return imgPromise
}
