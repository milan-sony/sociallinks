window.onload = function () {
    setTimeout(function () {
        // preloader
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 1000);
};