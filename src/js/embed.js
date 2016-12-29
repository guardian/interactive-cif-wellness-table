import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();

    el.innerHTML = embedHTML;

    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata/1hZiqsrU1JchPNqlJ0eSNcB7xkaINfmC2_1V19aY0dBg.json',
        type: 'json',
        crossOrigin: true,
        success: (resp) =>  doStuff( resp )//el.querySelector('.test-msg').innerHTML = `Your IP address is ${resp.ip}`
    });

    function doStuff( resp ) {
        //console.log(resp);
        var months = getParameterByName("months");

        if (months === null) {
            months = "1,12";
        }

        months = months.split(",");

        var startIndex = parseInt(months[0]) - 1;
        var endIndex = parseInt(months[1]); 

        var data = resp.sheets["Sheet1"], i, htmlString = "";

        for (i = startIndex; i < endIndex; i++) {

            htmlString += "<div class='table-row'>";
            htmlString += "<div class='table-cell left-col'><h4>" + data[i]["Month"] + "</h4></div>";
            htmlString += "<div class='table-cell middle-col'><h3><span class='carl'>Carl: </span>" + data[i]["Carl focus"] + "</h3><p>" + data[i]["Carl details"] + "</p></div>";
            htmlString += "<div class='table-cell right-col'><h3><span class='andre'>Andr&eacute;: </span>" + data[i]["Andre focus"] + "</h3><p>" + data[i]["Andre details"] + "</p></div>";
            htmlString += "</div>"

        }

        var content = document.getElementById("wellness-diary-content");
        content.innerHTML = htmlString;



        // console.log( resp.sheets[sheet]);
    }

    function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

};
