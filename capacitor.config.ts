import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '774350942563-dbr61666d2ajb2gmp3tu9n8h102leh2m.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
  appId: 'io.ionic.starter',
  appName: 'team-play',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
