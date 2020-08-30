import { createStore } from 'redux';

import FAKE_DATA from './FAKE_DATA.json';

export default createStore((state, action) => {
  if (state === undefined) {
    return {
      isLogin: true,
      BOARDS_DATA: FAKE_DATA.BOARDS_DATA,
      BOARD_CONTENTS: FAKE_DATA.BOARD_CONTENTS,
    };
  }
  if (action.type === 'SIGNIN') {
    return { ...state, isLogin: action.isLogin };
  }
  if (action.type === 'SIGNOUT') {
    return { ...state, isLogin: action.isLogin };
  }
  if (action.type === 'SETBOARD_CONTENTS') {
    return { ...state, BOARD_CONTENTS: action.BOARD_CONTENTS };
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
