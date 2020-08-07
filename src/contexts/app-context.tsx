import React, { useEffect } from 'react'

import { getFileUrl, intensifyImage, removeBackground, imageToBase64, scaleImage, loadImage } from '../utils/image'
import { isRemoveBgRateLimited } from '../utils/is-remove-bg-rate-limited'

type Action =
  | { type: 'processingMessage'; message: string }
  | { type: 'loading'; isLoading: boolean }
  | { type: 'intensifiedImage'; intensifiedImage: HTMLImageElement }
  | { type: 'scaledImage'; scaledImage: HTMLImageElement }
  | { type: 'error'; hasError: boolean }
  | { type: 'useRemoveBg'; useRemoveBg: boolean }
  | { type: 'intensityChange'; intensity: number }
  | { type: 'removeBgRateLimited'; removeBgRateLimited: boolean }
  | { type: 'done' }
type Dispatch = (action: Action) => void
type State = {
  intensifiedImage?: HTMLImageElement
  scaledImage?: HTMLImageElement
  isLoading: boolean
  hasError: boolean
  intensity: number
  processingMessage: string
  useRemoveBg: boolean
  removeBgRateLimited: boolean
}
interface AppProviderProps {
  children: React.ReactNode
}

const initialState: State = {
  intensifiedImage: undefined,
  scaledImage: undefined,
  isLoading: false,
  hasError: false,
  intensity: 25,
  processingMessage: '',
  useRemoveBg: false,
  removeBgRateLimited: false,
}

const AppStateContext = React.createContext<State | undefined>(undefined)
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined)

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case 'processingMessage': {
      return { ...state, processingMessage: action.message }
    }
    case 'loading': {
      return { ...state, isLoading: action.isLoading }
    }
    case 'intensifiedImage': {
      return { ...state, intensifiedImage: action.intensifiedImage }
    }
    case 'scaledImage': {
      return { ...state, scaledImage: action.scaledImage }
    }
    case 'error': {
      return { ...state, hasError: action.hasError }
    }
    case 'done': {
      return { ...state, hasError: false, isLoading: false, processingMessage: '' }
    }
    case 'useRemoveBg': {
      return { ...state, useRemoveBg: action.useRemoveBg }
    }
    case 'intensityChange': {
      return { ...state, intensity: action.intensity }
    }
    case 'removeBgRateLimited': {
      return { ...state, removeBgRateLimited: action.removeBgRateLimited }
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}

async function intensify(dispatch: Dispatch, img: HTMLImageElement, intensity: number) {
  try {
    dispatch({ type: 'processingMessage', message: 'Intensifying...' })
    const intensifiedImage = await intensifyImage(img, intensity)
    dispatch({ type: 'intensifiedImage', intensifiedImage })
  } catch (error) {
    dispatch({ type: 'error', hasError: true })
    console.log(error)
  } finally {
    dispatch({ type: 'done' })
  }
}

async function intensityChanged(dispatch: Dispatch, intensity: number, scaledImage?: HTMLImageElement) {
  dispatch({ type: 'intensityChange', intensity })
  if (scaledImage) {
    intensify(dispatch, scaledImage, intensity)
  }
}

async function imageSelected(dispatch: Dispatch, intensity: number, useRemoveBg: boolean, files?: FileList) {
  if (files) {
    const file = files.item(0)
    if (file) {
      try {
        dispatch({ type: 'processingMessage', message: 'Loading image...' })
        dispatch({ type: 'loading', isLoading: true })
        const originalImage = await loadImage(getFileUrl(file))
        dispatch({ type: 'processingMessage', message: 'Scaling image...' })
        let scaledImage = await scaleImage(originalImage)
        if (useRemoveBg) {
          dispatch({ type: 'processingMessage', message: 'Converting to base64...' })
          const base64Image = await imageToBase64(scaledImage.src)
          dispatch({ type: 'processingMessage', message: 'Removing background...' })
          scaledImage = await removeBackground(base64Image)
        }
        intensify(dispatch, scaledImage, intensity)
        dispatch({ type: 'scaledImage', scaledImage })
      } catch (error) {
        dispatch({ type: 'error', hasError: true })
        console.log(error)
      } finally {
        dispatch({ type: 'done' })
      }
    }
  }
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = React.useReducer(appReducer, initialState)

  useEffect(() => {
    isRemoveBgRateLimited().then((isRateLimited) =>
      dispatch({ type: 'removeBgRateLimited', removeBgRateLimited: isRateLimited })
    )
  }, [])

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

function useAppState() {
  const context = React.useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider')
  }
  return context
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext)
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within an AppProvider')
  }
  return context
}

export { AppProvider, useAppDispatch, useAppState, imageSelected, intensityChanged }
