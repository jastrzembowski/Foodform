import Form from "./components/form/Form";
import "./app.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#12315s",
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        <Form />
      </div>
    </ThemeProvider>
  );
}

export default App;
