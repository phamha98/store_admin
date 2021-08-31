import {all} from 'redux-saga/effects'
import {watcherAuthen} from './watcherAuthen';
export default function * rootWatcher(){
yield all([watcherAuthen()]);
}