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
          text: string
        }
      }
      info: string
      error: string
      loading: string
      link: {
        normal: string
        visited: string
      }
    }
  }
}
