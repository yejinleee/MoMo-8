import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { store } from './_redux/store';
import { GlobalReset } from './style/GlobalReset';
import { theme } from './style/theme';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
  },
  queryCache: new QueryCache({
    onError: () => {},
  }),
});
const persistor = persistStore(store);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}>
          <ThemeProvider theme={theme}>
            <GlobalReset />
            <Outlet />
          </ThemeProvider>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
