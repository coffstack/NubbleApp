import React, {useEffect} from 'react';

import {settingsService, useAppColor} from '@services';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Toast} from '@components';
import {useAppColorScheme} from '@hooks';

import {Router} from './src/routes/Routes';
import {AuthCredentialsProvider} from './src/services/authCredentials/Providers/AuthCredentialsProvider';
import {initializeStorage, MMKVStorage} from './src/services/storage';
import {darkTheme, theme} from './src/theme/theme';

initializeStorage(MMKVStorage);

const queryClient = new QueryClient();

function App(): JSX.Element {
  useAppColorScheme();
  const appColor = useAppColor();

  useEffect(() => {
    settingsService.handleStatusBar(appColor);
  }, [appColor]);

  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={appColor === 'dark' ? darkTheme : theme}>
            {/* Only use ToastProvider if it is using Context implementation.
          Zustand implementation doesn't need a provider */}
            {/* <ToastProvider> */}
            <Router />
            <Toast />
            {/* </ToastProvider> */}
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;
