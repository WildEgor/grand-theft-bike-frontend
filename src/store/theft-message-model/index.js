import { thunk, action } from 'easy-peasy';
import { handlePromise } from 'Utils/data-utils';
import { casesAPI } from 'Services/api';
import config from 'Src/config';

const { MY_CLIENT_ID } = config;

const theftMessageModel = {
  theftMessageState: {
    thefts: [],
  },
  addNewUnauthorizedMessage: thunk(async (actions, payload, { getState, getStoreState }) => {
    const newMessage = {
      status: 'new',
      // date: Date.now(),
      // updateAt: Date.now(),
      // createdAt: Date.now(),
      licenseNumber: payload.licenseNumber,
      color: payload.color,
      type: payload.type,
      ownerFullName: payload.ownerFullName,
      description: payload.description,
      clientId: MY_CLIENT_ID,
    };

    const [addNewUnauthorizedMessageData, addNewUnauthorizedMessageError] = await handlePromise(
      casesAPI.addNewUnauthorizedMessage(newMessage)
    );

    if (!addNewUnauthorizedMessageError && addNewUnauthorizedMessageData.data.status === 200) {
      alert('Ваше сообщение отправлено');
      actions.addNewMessageSuccess(addNewUnauthorizedMessageData.data.case);
    } else alert(addNewUnauthorizedMessageError);
  }),
  addNewMessage: thunk(async (actions, payload, { getState, getStoreState }) => {
    const { token } = getStoreState().auth.authState;

    console.log(payload);

    const newMessage = {
      status: 'new',
      // date: Date.now(),
      // updateAt: Date.now(),
      // createdAt: Date.now(),
      licenseNumber: payload.licenseNumber,
      color: payload.color,
      type: payload.type,
      ownerFullName: payload.ownerFullName,
      officerId: payload.officer,
      description: payload.description,
      // resolution: "",
    };

    const [addNewMessageData, addNewMessageError] = await handlePromise(
      casesAPI.addNewMessage(token, newMessage)
    );

    if (!addNewMessageError && addNewMessageData.status === 200) {
      alert('Ваше сообщение отправлено');
      actions.addNewMessageSuccess(addNewMessageData.data.case);
    } else alert(addNewMessageError);
  }),
  getTheftMessages: thunk(async (actions, payload, { getState, getStoreState }) => {
    const { token } = getStoreState().auth.authState;

    const [getAllMessagesData, getAllMessagesError] = await handlePromise(
      casesAPI.getAllMessages(token)
    );

    if (!getAllMessagesError && getAllMessagesData.status === 200) {
      console.log('NEW THEFT', getAllMessagesData);
      actions.addThefts(getAllMessagesData.data.cases);
    } else alert(getAllMessagesError);
  }),
  deleteMessage: thunk(async (actions, payload, { getState, getStoreState }) => {
    const { token } = getStoreState().auth.authState;

    const [deleteMessageData, deleteMessageError] = await handlePromise(
      casesAPI.deleteMessage(token, payload.messageId)
    );

    if (!deleteMessageError) {
      console.log('deleteMessage', deleteMessageData);
      actions.deleteMessageSuccess(deleteMessageData.data.case);
    } else alert(deleteMessageError);
  }),
  editMessage: thunk(async (actions, payload, { getState, getStoreState }) => {
    const { token } = getStoreState().auth.authState;
    console.log('editMessage', payload);
    const [editMessageData, editMessageError] = await handlePromise(
      casesAPI.editMessage(token, payload.messageId, {
        ...payload.newMessage,
        // updateAt: Date.now(),
      })
    );

    if (!editMessageError) {
      actions.editMessageSuccess(editMessageData.data.case);
    } else alert(editMessageError);
  }),
  addThefts: action((state, payload) => {
    state.theftMessageState = { ...state.theftMessageState, thefts: payload };
  }),
  deleteMessageSuccess: action((state, payload) => {
    state.theftMessageState = {
      ...state.theftMessageState,
      thefts: state.theftMessageState.thefts.filter((theft) => theft.id !== payload),
    };
  }),
  addNewMessageSuccess: action((state, payload) => {
    state.theftMessageState = {
      ...state.theftMessageState,
      thefts: [...state.theftMessageState.thefts, payload],
    };
  }),
  editMessageSuccess: action((state, payload) => {
    state.theftMessageState = {
      ...state.theftMessageState,
      thefts: state.theftMessageState.thefts.map((theft) => {
        if (theft.id === payload.id) {
          return payload;
        }
        return theft;
      }),
    };
  }),
};

export default theftMessageModel;
