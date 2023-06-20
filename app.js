document.addEventListener('DOMContentLoaded', function() {
    var logo = document.querySelector('.logo');
    var h1 = document.querySelector('h1');

    setTimeout(function() {
        logo.classList.add('show');
        h1.classList.add('show');
    }, 1000);
});