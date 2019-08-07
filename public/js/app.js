

const formEL = document.querySelector('form');
const searchEL = document.querySelector('input');

formEL.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = searchEL.value;

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				render(data.error);
			} else {
				render(data.location)
				render(data.forecast)
			}
		});
	})
});

const render = (text) => {
	const p_El = document.createElement('p');
	p_El.textContent = text;
	formEL.appendChild(p_El);
}