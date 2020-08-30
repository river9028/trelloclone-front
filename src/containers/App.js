import { connect } from 'react-redux';

import App from '../App';

const mapReduxStateToReactProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => {
      dispatch({ type: 'SIGNIN', isLogin: true });
    },
    signOut: () => {
      dispatch({ type: 'SIGNOUT', isLogin: false });
    },
  };
};

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(App);
