const sort = document.getElementById('mainDiv');
const binContainer = document.getElementById('binContainer');
const binColorContainer = document.getElementById('binColorContainer');

new Sortable(sort, {
    group: 'shared',
    animation: 150,

    // Wrzucanie diva do kosza
    // Funkcja po "ruszeniu elementu"
    onStart: function (evt) {
        binContainer.style.display = 'flex';
        binColorContainer.style.display = 'flex';
    },

    onEnd: function (evt) {
        binContainer.style.display = 'none';
        binColorContainer.style.display = 'none';
        remove();
    },
});

new Sortable(binContainer, {
    group: 'shared',
    animation: 150,
});

const remove = () => {
    binContainer.removeChild(binContainer.firstElementChild);
}