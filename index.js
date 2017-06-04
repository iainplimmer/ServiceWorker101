if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(console.log)
    .catch(err => console.error('Looks like there is an error....', err))
}