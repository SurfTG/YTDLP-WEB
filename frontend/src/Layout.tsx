import { ThemeProvider } from '@emotion/react'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Dashboard from '@mui/icons-material/Dashboard'
import DownloadIcon from '@mui/icons-material/Download'
import Menu from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import SettingsEthernet from '@mui/icons-material/SettingsEthernet'
import { Box, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'
import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { settingsState } from './atoms/settings'
import { connectedState } from './atoms/status'
import AppBar from './components/AppBar'
import Drawer from './components/Drawer'
import FreeSpaceIndicator from './components/FreeSpaceIndicator'
import Logout from './components/Logout'
import SocketSubscriber from './components/SocketSubscriber'
import ThemeToggler from './components/ThemeToggler'
import Toaster from './providers/ToasterProvider'

export default function Layout() {
  const [open, setOpen] = useState(false)

  const settings = useRecoilValue(settingsState)
  const isConnected = useRecoilValue(connectedState)

  const mode = settings.theme
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: settings.theme,
        background: {
          default: settings.theme === 'light' ? grey[50] : '#121212'
        },
      },
    }), [settings.theme]
  )

  const toggleDrawer = () => setOpen(state => !state)

  return (
    <ThemeProvider theme={theme}>
      <SocketSubscriber>
        <Helmet>
          <title>
            {settings.appTitle}
          </title>
        </Helmet>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar sx={{ pr: '24px' }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <Menu />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {settings.appTitle}
              </Typography>
              <FreeSpaceIndicator />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
                <SettingsEthernet />
                <span>
                  &nbsp;{isConnected ? settings.serverAddr : 'not connected'}
                </span>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeft />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <Link to={'/'} style={
                {
                  textDecoration: 'none',
                  color: mode === 'dark' ? '#ffffff' : '#000000DE'
                }
              }>
                <ListItemButton>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </Link>
              <Link to={'/archive'} style={
                {
                  textDecoration: 'none',
                  color: mode === 'dark' ? '#ffffff' : '#000000DE'
                }
              }>
                <ListItemButton>
                  <ListItemIcon>
                    <DownloadIcon />
                  </ListItemIcon>
                  <ListItemText primary="Archive" />
                </ListItemButton>
              </Link>
              <Link to={'/settings'} style={
                {
                  textDecoration: 'none',
                  color: mode === 'dark' ? '#ffffff' : '#000000DE'
                }
              }>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </Link>
              <ThemeToggler />
              <Logout />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
        <Toaster />
      </SocketSubscriber>
    </ThemeProvider>
  )
}