import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from '../views/appview';
import About from '../views/aboutview';
import Contact from '../views/contactview';
import NavMenu from '../components/navmenu';

function Router() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
