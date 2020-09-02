import { connect } from 'react-redux';

const mapReduxStateToReactProps = (state) => {
  return {
    pageTitle: state.pageTitle,
    isTitleEditing: state.isTitleEditing,
    newBoardTitle: state.newBoardTitle,
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
    setPageTitle: (pageTitle) => {
      dispatch({ type: 'SET_PAGETITLE', pageTitle });
    },
    setIsTitleEditing: (isTitleEditing) => {
      dispatch({ type: 'SET_ISTITLEEDITING', isTitleEditing });
    },
    setNewBoardTitle: (newBoardTitle) => {
      dispatch({ type: 'SET_NEWTITLE', newBoardTitle });
    },
  };
};

export default (component) => {
  return connect(mapReduxStateToReactProps, mapDispatchToProps)(component);
};
