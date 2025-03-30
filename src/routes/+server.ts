import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DIFY_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { message } = await request.json();
        
        if (!message) {
            return json({ error: 'メッセージが必要です' }, { status: 400 });
        }

        const res = await fetch('https://api.dify.ai/v1/chat-messages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DIFY_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: {},
                query: message,
                response_mode: 'blocking',
                conversation_id: '',
                user: 'user-' + Math.random().toString(36).substring(7)
            })
        });

        const data = await res.json();
        return json({ answer: data.answer });
    } catch (err) {
        console.error('エラーが発生しました:', err);
        return json({ error: 'エラーが発生しました。もう一度お試しください。' }, { status: 500 });
    }
}; 