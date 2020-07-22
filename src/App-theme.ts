import { DefaultTheme } from 'styled-components'

const AppTheme: DefaultTheme = {
  font: "'Courier New', Courier, monospace",
  colors: {
    background: '#282c34',
    buttons: {
      action: {
        main: '#e7a61a',
        hover: '#e833e2',
        text: '#282c34',
      },
    },
    info: '#00eeff',
    loading: '#1adee7',
    link: {
      normal: '#fff',
      visited: '#ffa8b7',
    },
  },
}

export { AppTheme }
