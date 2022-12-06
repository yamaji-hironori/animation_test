const changeOpacity = () => {
    const clientHeight = root_element.clientHeight;
    const webGlTopFromWindowTop = document.getElementById('WebglScrollArea').getBoundingClientRect().top;
    const webGlBottmFromWindowTop = document.getElementById('WebglScrollArea').getBoundingClientRect().bottom;
    if (clientHeight <= webGlTopFromWindowTop) {
        document.getElementById('Webgl').style.opacity = 0;
    } else if (0 <= webGlTopFromWindowTop) {
        document.getElementById('Webgl').style.opacity = ((clientHeight - webGlTopFromWindowTop) / clientHeight) ** effectController.opacitySpeed;
    } else if (webGlTopFromWindowTop <= 0 && clientHeight <= webGlBottmFromWindowTop) {
        document.getElementById('Webgl').style.opacity = 1;
    } else if (0 < webGlBottmFromWindowTop && webGlBottmFromWindowTop <= clientHeight) {
        document.getElementById('Webgl').style.opacity = (1 - ((clientHeight - webGlBottmFromWindowTop) / clientHeight)) ** effectController.opacitySpeed;
    } else {
        document.getElementById('Webgl').style.opacity = 0;
    }
}

window.addEventListener('scroll', function(e) {
    changeOpacity();
});

window.onload = changeOpacity;
