import { Toolbar, Typography } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../theme/themeContext'

const Footer = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeContext is not provided');
  }

  const { theme } = themeContext;

  return (
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', backgroundColor: theme === 'light' ? 'primary.main' : 'secondary.main', color:'white' }}>
        <Typography sx={{ fontSize: '0.8rem' }}>
          &#169; Maria Aluko 2025
        </Typography>
      </Toolbar>
  )
}

export default Footer