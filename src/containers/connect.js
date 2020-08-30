import { connect } from 'react-redux';

const mapReduxStateToReactProps = (state) => {
  return {
    BOARD_CONTENTS: state.BOARD_CONTENTS,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBOARD_CONTENTS: (BOARD_CONTENTS) => {
      dispatch({ type: 'SETBOARD_CONTENTS', BOARD_CONTENTS });
    },
  };
};

export default (component) => {
  return connect(mapReduxStateToReactProps, mapDispatchToProps)(component);
};
