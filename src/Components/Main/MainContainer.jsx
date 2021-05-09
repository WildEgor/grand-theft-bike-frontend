import React from "react";
import { Redirect } from "react-router";
import Main from "./Main.jsx";

import { useStoreActions, useStoreState } from 'easy-peasy';

const MainContainer = () => {
  const { isAuth } = useStoreState(state => state.auth.authState)

  if (isAuth) {
    return <Redirect to={"/menu"} />;
  }

  return <Main />;
};

export default MainContainer;