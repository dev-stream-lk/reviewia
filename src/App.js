import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import './App.css';
import UserForm from './pages/UserForm';

const theme = createMuiTheme({
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
                <UserForm/>
            </div>
        </ThemeProvider>
    );
}

export default App;
