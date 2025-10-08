import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import LengthConverter from "./pages/LengthConverter";
import WeightConverter from "./pages/WeightConverter";
import TemperatureConverter from "./pages/TemperatureConverter";
import DataStorageConverter from "./pages/DataStorageConverter";
import SpeedConverter from "./pages/SpeedConverter";
import TimeConverter from "./pages/TimeConverter";
import PxRemEmConverter from "./pages/PxRemEmConverter";
import TailwindPxConverter from "./pages/TailwindPxConverter";
import ViewportConverter from "./pages/ViewportConverter";
import ColorConverter from "./pages/ColorConverter";

function App() {

  return (
    <div className="">
      <div className="min-h-screen flex flex-col">
        <Router>
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/length" element={<LengthConverter />} />
                <Route path="/weight" element={<WeightConverter />} />
                <Route path="/temperature" element={<TemperatureConverter />} />
                <Route path="/data-storage" element={<DataStorageConverter />} />
                <Route path="/speed" element={<SpeedConverter />} />
                <Route path="/time" element={<TimeConverter />} />
                <Route path="/px-rem-em" element={<PxRemEmConverter />} />
                <Route path="/tailwind-px" element={<TailwindPxConverter />} />
                <Route path="/viewport" element={<ViewportConverter />} />
                <Route path="/color" element={<ColorConverter />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
