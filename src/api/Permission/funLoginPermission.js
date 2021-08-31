import localhost from './localhost';

const apiLoginPermision = (email, password) =>
  fetch(localhost + 'api/acount_customer/login_permision', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiLoginPermision;
