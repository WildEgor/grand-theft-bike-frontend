import React from "react";
import { Redirect } from "react-router";
import AuthorizedMenu from "./AuthorizedMenu.jsx";

import { useStoreState } from 'easy-peasy';

const AuthorizedMenuContainer = () => {
  const { isAuth } = useStoreState(state => state.auth.authState)

  if (!isAuth) 
    return <Redirect to={"/"} />;

  return <AuthorizedMenu />;
};

export default AuthorizedMenuContainer;