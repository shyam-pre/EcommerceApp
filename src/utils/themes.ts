// themes.ts
export type ThemeType = {
  mode: string;
  background: string;
  text: string;
  primary: string;
  card: string;
};

export const themes: Record<string, ThemeType> = {
  light: {
    mode: 'light',
    background: '#FFFFFF',
    text: '#000000',
    primary: '#3390EC',
    card: '#F5F5F5',
  },
  dark: {
    mode: 'dark',
    background: '#000000',
    text: '#FFFFFF',
    primary: '#3390EC',
    card: '#1C1C1C',
  },
  purple: {
    mode: 'purple',
    background: '#EFE9F4',
    text: '#2E1A47',
    primary: '#8A2BE2',
    card: '#E0D2F7',
  },
};
