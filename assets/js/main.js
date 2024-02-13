function convert() {
    const fileInput = document.getElementById('inputFile');
    const file = fileInput.files[0];
    if (!file) return alert("Please choose a file to convert.");

    const formData = new FormData();
    formData.append('file', file);

    fetch('/convert', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
    }).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; 
        a.download = 'converted.mp3';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }).catch(console.error);
}
