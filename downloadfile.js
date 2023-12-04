var bb = new Blob([localStorage.getItem("items")], { type: 'application/json' });
var a = document.createElement('a');
a.download = 'download.json';
a.href = window.URL.createObjectURL(bb);
a.click();