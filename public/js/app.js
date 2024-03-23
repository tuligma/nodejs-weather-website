const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const result1 = document.querySelector('#result')
const result2 = document.querySelector('#result2')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const location = search.value.trim('')
	result.textContent = 'Searching...'
	result2.textContent = ''

	fetch('http://localhost:3000/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			search.value = ''
			if (data.error) {
				result.textContent = data.error
			} else {
				result.textContent = data.location.trim()
				result2.textContent = data.forecast
			}
		})
	})
})
