import { thunk, action } from 'easy-peasy';
import { handlePromise } from 'Utils/data-utils';
import { authAPI } from 'Services/api';
import config from 'Src/config';

const { MY_CLIENT_ID } = config;

const authorization = JSON.parse(localStorage.getItem('bikeTheftAuthorization'));

const authModel = {
  authState: {
    userInfo: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      repassword: '',
      clientId: MY_CLIENT_ID,
      approved: false,
    },
    isAuth: authorization ? authorization.isAuth : false,
    token: authorization ? authorization.token : '',
  },
  authMeSuccess: action((state, payload) => {
    state.authState.isAuth = true;
    state.authState.token = payload;
  }),
  signOutSuccess: action((state, payload) => {
    state.authState.isAuth = false;
  }),
  updateUserData: action((state, payload) => {
    const newUserData = payload;
    state.authState.userInfo = { ...state.authState.userInfo, ...newUserData };
  }),
  signIn: thunk(async (actions, payload, { getState }) => {
    const [signInData, signInError] = await handlePromise(authAPI.signIn(payload));

    if (!signInError && signInData.status === 200) {
      const { token } = signInData.data;
      actions.authMeSuccess(token);
      localStorage.setItem('bikeTheftAuthorization', JSON.stringify({ token, isAuth: true }));
    } else alert(signInError);
  }),
  signUp: thunk(async (actions, payload, { getState }) => {
    actions.updateUserData(payload);
    console.log(getState().authState);
    const { userInfo } = getState().authState;
    const [signUpData, signUpError] = await handlePromise(
      authAPI.signUp({ ...userInfo, approved: false }) // TODO: approved false maybe?
    );

    if (!signUpError && signUpData.status === 200) {
      actions.authMeSuccess();
      alert('Вы зарегистрированы!');
    } else alert(signUpError);
  }),
  signOut: thunk(async (actions, payload, { getState }) => {
    localStorage.setItem('bikeTheftAuthorization', JSON.stringify({ token: null, isAuth: false }));

    actions.signOutSuccess();
  }),
};

export default authModel;
