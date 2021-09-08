import {localhost} from './localhost';

export  const apiListStaff = token =>
  fetch(localhost + 'api/permission_admin/list_staff', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
 