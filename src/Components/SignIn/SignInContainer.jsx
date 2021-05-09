import React from "react";
import { Redirect } from "react-router";
import SignInForm from "./SignInForm.jsx";
import { useStoreActions, useStoreState } from 'easy-peasy';

const SignInContainer = () => {
  const { isAuth } = useStoreState(state => state.auth.authState)
  const signIn = useStoreActions(actions => actions.auth.signIn)

  if (isAuth) 
    return <Redirect to={"/menu"} />;
  
  const onSubmit = (formData) => {
    signIn(formData);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignInContainer;