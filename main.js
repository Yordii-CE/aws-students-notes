const $form = document.getElementById('form')
const { code, intra, final } = $form

const sendNotes = async (notes) => {
  const API_URL = `https://u6ncwl1l88.execute-api.us-east-2.amazonaws.com/dev/notes`

  const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notes),
    }),
    json = await res.json()
  return json
}

$form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const response = await sendNotes({
    code: Number(code.value),
    intra: Number(intra.value),
    final: Number(final.value),
  })

  if (response.statusCode != 200) {
    swal({
      title: response.statusText,
      text: response.message,
      icon: 'error',
    })
    return
  }

  swal({
    title: response.statusText,
    text: response.message,
    icon: 'success',
  })
  $form.reset()
})
