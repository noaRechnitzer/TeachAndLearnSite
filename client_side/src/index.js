import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor} from './store'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import MyComponent from './example';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#dc967e',
    },
    secondary: {
      main: '#8bb9b9',
      contrastText: '#dc967e',
    },
    info: {
      main: '#dc967e',
    },
  },
});
root.render(
  <div style={{backgroundColor:'#6d9eb74d'}}>
  <React.StrictMode>
  {/* <PersistGate loading={null} persistor={persistor}> */}
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
          {/* <MyComponent/> */}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
    {/* </PersistGate> */}
  </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
