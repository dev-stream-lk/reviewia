import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import './App.css';
import AboutUs from './pages/AboutUs';
import Router from './pages/Router';
import UserForm from './pages/UserForm';

const theme = createTheme({
    palette:{
        primary:{
            main:"#1E3A5C"
        }
    }
})



function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <Router/>
            </div>
        </ThemeProvider>
    );
}

export default App;
