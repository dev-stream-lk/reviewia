import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import './App.css';
import Router from './pages/Router';
import {UserContext, initialUserData} from './context/UserContext';
import { useState } from 'react';

const theme = createTheme({
    palette:{
        primary:{
            main:"#1E3A5C"
        }
    }
})

function App() {

    const changeUserContext = (data) => {
        setUserData(data)
      }
    
      const [userData, setUserData] = useState({
        userData:{
          ...initialUserData
        },
        setUserData:changeUserContext
      });


    return (
        <UserContext.Provider value={userData}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="App">
                    <Router/>
                </div>
            </ThemeProvider>
        </UserContext.Provider>
    );
}

export default App;
