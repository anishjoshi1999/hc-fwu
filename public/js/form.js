const scriptURL = 'https://script.google.com/macros/s/AKfycbwChcq8QaSPjJDpL6eouLRlONxqAzt_lzLPSKoKlhxw0owwiV34cZJdBOFGWC5GNzACAw/exec'
const form = document.forms['formName']
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! your form is submitted successfully."))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
})