<script lang="ts">
	let message = $state('');
	let response = $state('');
	let loading = $state(false);

	async function sendMessage() {
		if (!message) return;
		loading = true;
		try {
			const res = await fetch('', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message })
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			response = data.answer;
		} catch (err) {
			console.error('エラーが発生しました:', err);
			response = 'エラーが発生しました。もう一度お試しください。';
		} finally {
			loading = false;
		}
	}
</script>

<main class="max-w-2xl mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Dify AIチャット</h1>
	
	<div class="mb-4">
		<textarea
			bind:value={message}
			class="w-full p-2 border rounded"
			placeholder="メッセージを入力してください..."
			rows="4"
		/>
	</div>

	<button
		onclick={sendMessage}
		disabled={loading}
		class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
	>
		{loading ? '送信中...' : '送信'}
	</button>

	{#if response}
		<div class="mt-4 p-4 bg-gray-100 rounded">
			<p>{response}</p>
		</div>
	{/if}
</main>
