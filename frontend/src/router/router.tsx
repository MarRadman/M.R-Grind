import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from '../App';
import NavMenu from '../components/navmenu';
import '../assets/index.css'

function Router() {
  return (
    <BrowserRouter>
    <NavMenu />
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
