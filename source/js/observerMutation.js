function observeMutations(targetNode, config, callback) {
	// Создайте экземпляр наблюдателя с указанной функцией обратного вызова
	const observer = new MutationObserver(callback);

	// Начните наблюдение за настроенными изменениями целевого элемента
	observer.observe(targetNode, config);
}

export default observeMutations;
