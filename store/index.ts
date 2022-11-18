import { DataStore } from './data'

const appStore: any = {};

export const registerStore = () => {
  appStore.datatore = DataStore();
};

export default appStore;