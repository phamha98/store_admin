import localhost from './localhost';

const apiFilterAcountGender = token =>
  fetch(localhost + 'api/acount_admin/filter_user_gender', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiFilterAcountGender;
