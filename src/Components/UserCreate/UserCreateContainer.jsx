import React from "react";
import { Redirect } from "react-router";
import UserCreateForm from "./UserCreateForm.jsx";

import { useStoreActions, useStoreState } from 'easy-peasy';

const UserCreateContainer = () => {
  const isAuth = useStoreState(state => state.auth.authState.isAuth)
  const signUp = useStoreActions(actions => actions.auth.signUp)

  if (isAuth) {
    return <Redirect to={"/"} />;
  }

  const onSubmit = (formData) => {
    signUp(formData);
  };

  return (
    <UserCreateForm
      onSubmit={onSubmit}
      buttonName="Зарегистрироваться"
      isRegistration={true}
    />
  );
};

export default UserCreateContainer;