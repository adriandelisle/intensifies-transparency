import { DefaultTheme } from 'styled-components'

const AppTheme: DefaultTheme = {
  font: "'Courier New', Courier, monospace",
  colors: {
    background: '#282c34',
    buttons: {
      action: {
        main: '#e7a61a',
        hover: '#e833e2',
      },
    },
    loading: '#1adee7',
  },
}

export { AppTheme }
