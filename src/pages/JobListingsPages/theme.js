import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#EEEAEA',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#000000',
    },
  },
  components: {
    MuiStack: {
      defaultProps: {
        direction: 'row',
        sx: {justifyContent: "space-between"}
      },
    },
    MuiBox: {
      defaultProps: {
        component: 'form',
        autoComplete: 'off'
      }
    }
  },
});

export default theme;