import localhost from './localhost'

const apiUpdatePost = (id, title, content, img) =>
  fetch(localhost + 'api/post_tags/update', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      title: title,
      content: content,
      url: img,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err))
export default apiUpdatePost
