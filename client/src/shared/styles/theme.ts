import { createMuiTheme } from '@material-ui/core';

const Theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        color: 'rgba(61, 69, 89, 0.4)',
        '&$focused': {
          color: 'rgba(255, 255, 255, 0.63)'
        }
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
        borderBottom: '1px solid rgba(255, 255, 255, 0.63)',

        '&::after': {
          borderBottom: '2px solid rgba(255, 255, 255, 0.63)'
        }
      }
    }
  }
});

export default Theme;
