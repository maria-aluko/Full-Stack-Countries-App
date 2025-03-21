import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRedirect } from "./components/Auth/AuthRedirect";
import { Login } from "./components/Auth/Login";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import ProtectedTestData from "./components/ProtectedTestData";
import { TestData } from "./components/TestData";
import { AuthProvider } from "./context/AuthContext";
import CountriesList from "./components/Countries/CountriesList";
import CountryDetail from "./components/Countries/CountryDetail";
import Favorites from "./components/Favorites";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navigation />
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route
                path="/login"
                element={
                  <>
                    <AuthRedirect />
                    <Login />
                  </>
                }
              />
              <Route path="/test" element={<TestData />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedTestData />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/countries" element={<CountriesList />} />
              <Route path="/countries/:name" element={<CountryDetail />} />
              <Route path="/about" element={<AboutPage />} />

            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;