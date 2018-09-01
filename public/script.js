const submit = document.getElementById('submit');

const displayToken = (token) => {
  document.getElementById('key-response').innerText = token;
}

submit.addEventListener('click', (event) => {
  event.preventDefault();
  let name = document.getElementById('appName').value;
  let email = document.getElementById('email').value;

  fetch('/api/v1/jwt', {
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      name,
      email
    })
  }).then(response => response.json())
  .then(result => {
    displayToken(result.token)
  })
  .catch(err => console.log(err))
})

