function observeMutations(targetNode, config, callback) {
	const observer = new MutationObserver(callback);

	observer.observe(targetNode, config);
}

export default observeMutations;
