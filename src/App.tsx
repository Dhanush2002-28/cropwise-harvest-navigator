import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import APITestingComponent from "./components/APITestingComponent";
import { Toaster } from "sonner";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/api-test" element={<APITestingComponent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" closeButton />
      </Router>
    </LanguageProvider>
  );
}

export default App;
