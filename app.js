if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then((reg) => {
            console.log('Enregistrement réussi');
        })
        .catch((error) => {
            console.log('Erreur' + error);
        })
}