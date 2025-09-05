document.getElementById('promptForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const topic = document.getElementById('topic').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Generating...';
    try {
        const response = await fetch('http://localhost:8000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic })
        });
        const data = await response.json();
        resultDiv.textContent = data.prompt;
    } catch (err) {
        resultDiv.textContent = 'Error generating prompt.';
    }
});
