export const ThemeType = {
  dark: 'dark',
  default: 'default',
} as const;

export type ThemeType = (typeof ThemeType)[keyof typeof ThemeType];
