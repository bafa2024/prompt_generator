document.getElementById('promptForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const topic = document.getElementById('topic').value;
    const resultDiv = document.getElementById('result');
    resultDiv.querySelector(".loader").style.display = "initial";
    resultDiv.style.display = "block";
    try {
        const response = await fetch('http://localhost:8000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic })
        });
        const data = await response.json();
        resultDiv.querySelector("#result-txt").textContent = data.prompt;
        resultDiv.querySelector(".loader").style.display = "none";
    } catch (err) {
        resultDiv.querySelector("#result-txt").textContent = 'Error generating prompt.';
        resultDiv.querySelector(".loader").style.display = "none";
    }
});
