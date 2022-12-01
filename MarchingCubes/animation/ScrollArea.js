const change_opacity = () => {
    const clientHeight = root_element.clientHeight;
    const webGlTopFromWindowTop = document.getElementById('WebglScrollArea').getBoundingClientRect().top;
    const webGlBottmFromWindowTop = document.getElementById('WebglScrollArea').getBoundingClientRect().bottom;
    if (clientHeight <= webGlTopFromWindowTop) {
        document.getElementById('webgl').style.opacity = 0;
    } else if (0 <= webGlTopFromWindowTop) {
        document.getElementById('webgl').style.opacity = ((clientHeight - webGlTopFromWindowTop) / clientHeight) ** 3;
    } else if (webGlTopFromWindowTop <= 0 && clientHeight <= webGlBottmFromWindowTop) {
        document.getElementById('webgl').style.opacity = 1;
    } else if (0 < webGlBottmFromWindowTop && webGlBottmFromWindowTop <= clientHeight) {
        document.getElementById('webgl').style.opacity = (1 - ((clientHeight - webGlBottmFromWindowTop) / clientHeight)) ** 3;
    } else {
        document.getElementById('webgl').style.opacity = 0;
    }
}

window.addEventListener('scroll', function(e) {
    change_opacity();
});

change_opacity();
