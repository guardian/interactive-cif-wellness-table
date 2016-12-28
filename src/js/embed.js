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
        var sheet = getParameterByName("sheet");

        if (sheet === null) {
            sheet = "part1";
        } 

        var data = resp.sheets[sheet], i, htmlString = "";

        for (i = 0; i < data.length; i++) {

            htmlString += "<tr>";
            htmlString += "<td><h4>" + data[i]["Month"] + "</h4></td>";
            htmlString += "<td><h3><span class='carl'>Carl:</span>" + data[i]["Carl focus"] + "</h3></td>";
            htmlString += "<td><h3><span class='andre'>Andre:</span>" + data[i]["Andre focus"] + "</h3></td>";
            htmlString += "</tr>"

            htmlString += "<tr>";
            htmlString += "<td></td>";
            htmlString += "<td><p>" + data[i]["Carl details"] + "</p></td>";
            htmlString += "<td><p>" + data[i]["Andre details"] + "</p></td>";
            htmlString += "</tr>"
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
