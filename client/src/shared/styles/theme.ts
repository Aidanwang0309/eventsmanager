import { createMuiTheme, Theme } from '@material-ui/core';

const BasicTheme = (theme: Theme) =>
  createMuiTheme({
    ...theme,
    overrides: {
      MuiInputLabel: {
        root: {
          color: theme.palette.text.primary,
          '&$focused': {
            color: theme.palette.primary.dark
          }
        }
      },

      MuiDialog: {
        paper: {
          backgroundColor: '#F5F5F6'
        }
      },

      MuiFilledInput: {
        root: {
          color: '#616161',
          backgroundColor: 'transparent',

          '&:hover': {
            backgroundColor: 'transparent'
          },
          '&:focus': {
            backgroundColor: 'transparent'
          }
        },

        underline: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.33)',

          '&::after': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.63)'
          }
        }
      }
    }
  });

export default BasicTheme;
