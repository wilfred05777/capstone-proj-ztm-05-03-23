import react, { useMemo } from 'react'
// import { CssBaseline, ThemeProvider } from '@mui/material'
// import { createTheme } from '@mui/material'
// import { themeSettings } from './theme'
import { theme } from './_theme'
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
// import theme from './theme'

function App() {
  // const mode = useSelector((state) => state.global.mode)
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>This app is using the dark mode</main>
        {/* <Button sx={{ bgcolor: '#000' }}>My Button</Button> */}
      </ThemeProvider>
    </div>
  )
}

export default App
