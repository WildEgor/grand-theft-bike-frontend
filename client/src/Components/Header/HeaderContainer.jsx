import React from "react";
import Header from "./Header.jsx";

import { useStoreActions, useStoreState } from 'easy-peasy';

const HeaderContainer = () => {
  const { isAuth } = useStoreState(state => state.auth.authState)
  const signOut = useStoreActions(actions => actions.auth.signOut)

  return <Header isAuth={ isAuth } signOut={ signOut } />;
};

export default HeaderContainer;