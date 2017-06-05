var OfflineModule = (function (window){

    console.log('js loaded off the line');

    return {
        AlertUserOfDesperateSituation : function () {
            window.alert(`HELP WE'RE OFFLINE1!!!one!`);
        }
    }
    
})(window);