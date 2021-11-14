// export const localhost = 'http://192.168.0.103:8001/'
// export const localhost="https://boiling-ravine-46707.herokuapp.com/"
let  localhost = 'http://192.168.0.103:8001/'
const setLocalHost = h => {
  localhost = h
}
const getLocalHost = () => {
  return localhost
}
export {
    setLocalHost,
    getLocalHost,
    localhost
}