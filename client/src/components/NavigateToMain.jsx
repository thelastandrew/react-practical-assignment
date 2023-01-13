import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import Login from '../pages/Login/Login';

const NavigateToMain = (props) => {
  return !props.isAuth ? <Login /> : <Navigate to='/' />
}

const mapStateToProps = state =>({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(NavigateToMain);