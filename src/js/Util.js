var Util = {};

Util.offsetScreen = function (node) {
    if (node === document.body) return {top:0, left:0};
    var top = node.offsetTop,
        left = node.offsetLeft;
    node = node.parentNode;
    while (node !== document.body) {
        top -= node.scrollTop-node.offsetTop;
        left -= node.scrollLeft-node.offsetLeft;
        node = node.parentNode;
    }
    return { top: top, left: left };
};

Util.getMousePos = function (e, parent) {
    var pos;
    if (e.pageX == undefined) {
        pos = [e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY];
    } else {
        pos = [e.pageX, e.pageY];
    }
    if (parent != undefined) {
        var offset = Util.offsetScreen(parent);
        pos[0] -= offset.left;
        pos[1] -= offset.top;
    }
    return pos;
};

Util.addClass = function (ele, className) {
    Util.removeClass(ele, className);
    ele.className += ' '+className;
};

Util.removeClass = function (ele, className) {
    ele.className = ele.className
    .replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), ' ').trim();
};

module.exports = Util;
