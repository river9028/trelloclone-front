import React, { useEffect } from 'react';

import connect from '../containers/connect';

import Menu from './Menu';

function Settings({ setPageTitle }) {
  useEffect(() => {
    setPageTitle('Settings');
  });
  return (
    <>
      <Menu />
    </>
  );
}
export default connect(Settings);
