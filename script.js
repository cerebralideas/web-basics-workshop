let main = document.querySelector('.js_todo-app'),
	newBtn = main.querySelector('.js_todo-newBtn'),
	list = main.querySelector('.js_todo-list'),
	modal = document.querySelector('.js_modal-container'),
	closeBtn = modal.querySelector('.js_modal-closeBtn'),
	form = modal.querySelector('.js_modal-form'),
	todoTemplate = document.querySelector('.js_todo-template');

	function openModal(e) {
		main.classList.add('hasOpenModal');
		main.setAttribute('inert', '');
		modal.classList.add('isOpen');
		modal.focus();
	}
	function closeModal(e, hasNewTodo) {
		main.classList.remove('hasOpenModal');
		main.removeAttribute('inert');
		modal.classList.remove('isOpen');

		setTimeout(function manageFocus() {
			if (hasNewTodo) {
				let newTodos = list.querySelectorAll('.todo'),
					newTodo = newTodos[newTodos.length - 1].querySelector('input');

				newTodo.focus();
			} else {
				newBtn.focus();
			}
		}, 35);
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

	if (value === '') {
		let alert = modal.querySelector('.modal-formAlert');
		alert.classList.add('isShown');
		alert.setAttribute('aria-live', 'assertive');
	} else {
		let alert = modal.querySelector('.modal-formAlert');
		alert.classList.remove('isShown');
		alert.removeAttribute('aria-live', 'assertive');

		newTodo.querySelector('.todo-text').innerText = value;
		modal.querySelector('#todo-input').value = '';

		list.appendChild(newTodo);
		closeModal(e, true);
	}
});
list.addEventListener('click', function (e) {
	if (e.target.classList.contains('todo-removeBtn')) {
		e.target.parentNode.parentNode.parentNode.remove();
		if (list.children.length > 0) {
			list.focus();
		} else {
			newBtn.focus();
		}
	}
});