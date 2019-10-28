import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { themeMode } from 'src/shared/styles';

type IThemeProviderProps = {
  children: ReactNode;
};

type IThemeState = {
  light: boolean;
  hasThemeLoaded: boolean;
};

const defaultContextData = {
  light: false,
  toggleTheme: () => {}
};

const ThemeContext = createContext(defaultContextData);

export const useTheme = () => useContext(ThemeContext);

const useEffectLightMode = (): [
  IThemeState,
  React.Dispatch<React.SetStateAction<IThemeState>>
] => {
  const [theme, setTheme] = useState({
    light: false,
    hasThemeLoaded: false
  });

  useEffect(() => {
    const isLight = localStorage.getItem('light') === 'true';
    setTheme({ ...theme, light: isLight, hasThemeLoaded: true });
    /* eslint-disable-next-line */
  }, []);

  return [theme, setTheme];
};

const EmotionThemeProvider = <T extends IThemeProviderProps>(props: T) => {
  const [theme, setTheme] = useEffectLightMode();

  const toggleTheme = () => {
    const light = !theme.light;
    localStorage.setItem('light', JSON.stringify(light));
    setTheme({ ...theme, light });
  };

  const computedTheme = theme.light ? themeMode('light') : themeMode('dark');

  return (
    <ThemeProvider theme={computedTheme}>
      <ThemeContext.Provider value={{ light: theme.light, toggleTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default EmotionThemeProvider;
