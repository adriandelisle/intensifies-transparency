import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    font: string
    colors: {
      background: string
      buttons: {
        action: {
          main: string
          hover: string
        }
      }
      loading: string
    }
  }
}
