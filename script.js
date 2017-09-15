let main = document.querySelector('.js_todo-app'),
	newBtn = main.querySelector('.js_todo-newBtn'),
	list = main.querySelector('.js_todo-list'),
	modal = document.querySelector('.js_modal-container'),
	closeBtn = modal.querySelector('.js_modal-closeBtn'),
	form = modal.querySelector('.js_modal-form'),
	todoTemplate = document.querySelector('.js_todo-template');

function openModal(e) {
	main.classList.add('hasOpenModal');
	modal.classList.add('isOpen');
}
function closeModal(e, hasNewTodo) {
	main.classList.remove('hasOpenModal');
	main.removeAttribute('inert');
	modal.classList.remove('isOpen');
}

newBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
document.addEventListener('keyup', function (e) {
	if (event.keyCode === 27 && // Is key Esc key?
		main.className.indexOf('hasOpenModal') !== -1) { // Is modal open?

		closeModal();
	}
});

form.addEventListener('submit', function (e) {
	e.preventDefault();
	let value = e.target.elements.todo.value,
		newTodo = todoTemplate.querySelector('.todo').cloneNode('deep');

	newTodo.querySelector('.todo-text').innerText = value;

	list.appendChild(newTodo);
	closeModal(e, true);
});
list.addEventListener('click', function (e) {
	if (e.target.classList.contains('todo-removeBtn')) {
		e.target.parentNode.parentNode.parentNode.remove();
	}
});