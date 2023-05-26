import { extendTheme } from '@chakra-ui/react'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
}

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  semanticTokens: {
    colors: {
      text: {
        default: '#ade3b8',
        _dark: '#ade3b8',
      },
      heroGradientStart: {
        default: '#F9F9F9',
        _dark: '#F9F9F9',
      },
      heroGradientEnd: {
        default: '#FF6741',
        _dark: '#FF6741',
      },
    },
    radii: {
      button: '12px',
    },
  },
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
  background: {
    default: '#fff',
    _dark: '#fff',
  },
})

export default theme

