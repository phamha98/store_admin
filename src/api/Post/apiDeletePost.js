import localhost from './localhost'

const apiDeletePost = id =>
  fetch(localhost + 'api/post_tags/delete', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err))
export default apiDeletePost
