import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import Layout from './Layout';

const PrivateWrapper = (props) => {
  return props.isAuth ? <Layout /> : <Navigate to='/login' />
}

const mapStateToProps = state =>({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(PrivateWrapper);