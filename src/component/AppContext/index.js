import React, {createContext, useState} from 'react';
const AppContext = createContext();
const AppProvider = props => {
  const [token, setToken] = useState(
    'dIvazt5qX1e5bX7CFMMz7FoFMppbzy8P9t4IGMxR',
  );
  const [idUser, setIdUser] = useState('1');
  const [lEP, setLEP] = useState(false);
  const [permission,setPermission]=useState([])
  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        idUser,
        setIdUser,
        lEP,
        setLEP,
        permission,
        setPermission,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
export {AppProvider, AppContext};
