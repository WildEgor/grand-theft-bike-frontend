import { createStore } from 'easy-peasy';
import authModel from './auth-model';
import officersModel from './officers-model'
import theftMessageModel from './theft-message-model'

const model = {
  auth: authModel,
  officers: officersModel,
  theftMessage: theftMessageModel
};

const easyStore = createStore(model
  // persist(model,
  //   {
  //     //allow: [''],
  //     //storage: 'localStorage',
  //     //mergeStrategy: 'mergeDeep'
  //   },
  // ),
);

// Wrapping dev only code like this normally gets stripped out by bundlers
// such as Webpack when creating a production build.
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept(model, () => {
      easyStore.reconfigure(model);
    });
  }
}

export const refreshPage = async () => {
  // Firstly ensure that any outstanding persist operations are complete.
  // Note that this is an asynchronous operation so we will await on it.
  await easyStore.persist.flush();

  // we can now safely reload the page
  //window.document.reload();
};

export const deleteStoreData = async () => {
  await easyStore.persist.clear()
}

export default easyStore;