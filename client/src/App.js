import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './store/authReducer';
import PrivateWrapper from './components/PrivateWrapper';
import NavigateToMain from './components/NavigateToMain';
import Main from './pages/Main/Main';
import About from './pages/About';
import NotFound from './pages/NotFound/NotFound';

function App(props) {
  const userName = localStorage.getItem('username') || '';
  if (!!userName) props.login(userName);
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

export default connect(null, { login })(App);

