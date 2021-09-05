import localhost from './localhost';

export const apiLoadPost = () =>
  fetch (localhost + 'api/post_tags/load', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then (response => response.json ())
    .catch (err => console.log (err));
