async function sendMessage() {
    const input = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');
    
    // --- IMPORTANT: ADD YOUR GEMINI API KEY HERE ---
    const YOUR_API_KEY = "ur key";

    if (!input) {
        responseDiv.innerHTML = 'Please enter a question.';
        return;
    }

    // Show loading spinner
    responseDiv.innerHTML = '<div class="spinner"></div><div>Loading...</div>';

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${YOUR_API_KEY}`, {        method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: input }],
                        },
                    ],
                }),
            },
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        
        const markdownText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received from the AI.';
        responseDiv.innerHTML = marked.parse(markdownText);

    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerHTML = `<strong style="color: red;">Error:</strong> ${error.message}`;
    }

}
