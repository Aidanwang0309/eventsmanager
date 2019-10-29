import { createMuiTheme } from '@material-ui/core';

export const themeDark = createMuiTheme({
  palette: {
    primary: {
      light: '#565B6C',
      main: '#3d4458',
      dark: '#151d2f',
      contrastText: '#e0e0e0'
    },
    secondary: {
      light: '#ffbcaf',
      main: '#ff8a80',
      dark: '#c85a54',
      contrastText: '#fafafa'
    },
    background: {
      default: '#3d4458',
      paper: '#565B6C'
    },
    text: {
      primary: '#dcdcdc',
      secondary: '#ffffff'
    }
  }
});

export const themeLight = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#cfd8dc',
      dark: '#9ea7aa',
      contrastText: '#424242'
    },
    secondary: {
      light: '#d0d0d0',
      main: '#ffebee',
      dark: '#ccb9bc',
      contrastText: '#455a64'
    },
    background: {
      default: '#fff',
      paper: '#F5F5F6'
    },
    text: {
      primary: '#424242',
      secondary: '000000'
    }
  }
});

const themeMode = (mode: string) => (mode === 'dark' ? themeDark : themeLight);

export default themeMode;
// const modeTheme =

// primary?: PaletteColorOptions;
// secondary?: PaletteColorOptions;
// error?: PaletteColorOptions;
// type?: PaletteType;
// tonalOffset?: number;
// contrastThreshold?: number;
// common?: Partial<CommonColors>;
// grey?: ColorPartial;
// text?: Partial<TypeText>;
// divider?: string;
// action?: Partial<TypeAction>;
// background?: Partial<TypeBackground>;
// getContrastText?: (background: string) => string;
