import todoProduct from './cartReducer';
import changeState from './homeReducer'
import {combineReducers} from 'redux';

const ShopApp = combineReducers({
  _todoProduct: todoProduct,
  _changeState: changeState,
});
export default ShopApp;