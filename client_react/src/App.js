import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {
    UiChat,
} from "./page";
import {getRouterUrl} from "./router";

function App() {
    const theme = createTheme({})

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path={""} element={<UiChat/>}/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
