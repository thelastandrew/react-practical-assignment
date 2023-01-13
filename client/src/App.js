import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateWrapper from './components/PrivateWrapper';
import NavigateToMain from './components/NavigateToMain';
import Main from './pages/Main';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<NavigateToMain />} />
        <Route path="/" element={<PrivateWrapper />}>
          <Route index element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

