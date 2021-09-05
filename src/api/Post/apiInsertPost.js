import localhost from './localhost'

export const apiInsertPost = (title, content, img) =>
  fetch(localhost + 'api/post_tags/insert', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      content: content,
      url: img,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err))
