animate(box, {
    top: 300,
    left: 500,
    opacity: 0.2
}, 500, function () {
    utils.css(box, {
        borderRadius: '50%',
        background: 'lightblue'
    });
});