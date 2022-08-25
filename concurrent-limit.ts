function ConccurrentLimit (concurrency : any){
	if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}

	let queue : any[] = [];
	let activeCount = 0;

	const run = async (fn : any, resolve: any) => {
		activeCount++;

		const result = (async () => fn())();

		resolve(result);

		try {
			await result;
		} catch {}

		// Resume execution after all micro tasks have been executed
		activeCount--;
		// If current set of requests have finished processing then execute next set 
		// of concurrent requests
		if (activeCount === 0 && queue.length > 0) {
			for (let index = 0; index < concurrency; index++) {
				if (queue.length > 0) {
					queue.shift()();
				}
			}
		}
	};

	const enqueue = (fn : any, resolve : any) => {
		queue.push(run.bind(null, fn, resolve));

		(async () => {
			// Ensure that function waits until the next microtask before comparing
			// activeCount to concurrency, because activeCount is updated asynchronously
			// when the run function is dequeued and called. 
			await Promise.resolve();

			if (activeCount < concurrency && queue.length > 0) {
				queue.shift()();
			}
		})();
	};

	const addPromise = (fn : any) => new Promise(resolve => {
		enqueue(fn, resolve);
	});
	return addPromise;
};

module.exports = ConccurrentLimit;
