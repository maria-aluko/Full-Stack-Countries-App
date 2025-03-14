import { Toolbar, Typography } from '@mui/material'

const Footer = () => {
  return (
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'primary.main', color:'white' }}>
        <Typography>
          &#169; Maria Aluko 2025
        </Typography>
      </Toolbar>
  )
}

export default Footer