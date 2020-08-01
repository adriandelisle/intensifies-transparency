import React from 'react'

type Action = { type: 'processingMessage'; message: string }
type Dispatch = (action: Action) => void
type State = {
  processingMessage: string
}
interface AppProviderProps {
  children: React.ReactNode
}

const AppStateContext = React.createContext<State | undefined>(undefined)
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined)

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case 'processingMessage': {
      return { ...state, processingMessage: action.message }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = React.useReducer(appReducer, { processingMessage: '' })

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

export { AppProvider, useAppDispatch, useAppState }
