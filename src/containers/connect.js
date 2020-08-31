import { connect } from 'react-redux';

const mapReduxStateToReactProps = (state) => {
  return {
    BOARDS_DATA: state.BOARDS_DATA,
    BOARD_CONTENTS: state.BOARD_CONTENTS,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBOARDS_DATA: (BOARDS_DATA) => {
      dispatch({ type: 'SETBOARDS_DATA', BOARDS_DATA });
    },
    setBOARD_CONTENTS: (BOARD_CONTENTS) => {
      dispatch({ type: 'SETBOARD_CONTENTS', BOARD_CONTENTS });
    },
  };
};

export default (component) => {
  return connect(mapReduxStateToReactProps, mapDispatchToProps)(component);
};
