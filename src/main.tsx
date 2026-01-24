// src/main.tsx
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { initI18n, i18n } from '@/locales/config';
import { MuiLocaleProvider } from '@/themes/MuiLocaleProvider';
import { ThemeProvider } from '@/themes/ThemeProvider';
import App from './App';
import { Loading } from '@/components/loading';
import '@/styles/global.css';

// 初始化i18n并渲染应用
const startApp = async () => {
  try {
    await initI18n();
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <MuiLocaleProvider>
              <Suspense fallback={<Loading fullScreen />}>
                <App />
              </Suspense>
            </MuiLocaleProvider>
          </ThemeProvider>
        </I18nextProvider>
      </React.StrictMode>
    );
  } catch (error) {
    throw new Error(`Failed to start app: ${error as string}`);
  }
};

void startApp();
