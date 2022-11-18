import { DataStore } from './data'
import { ProductStore } from './product'
import { GlobalStore } from './global'

const appStore: any = {};

export const registerStore = () => {
  appStore.datastore = DataStore();
  appStore.product = ProductStore();
  appStore.global = GlobalStore();
};

export default appStore;