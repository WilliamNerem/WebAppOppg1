$(function () {
    hentAlleStrekninger();
});

function hentAlleStrekninger() {
    $.get("strekning/hentalle", function (strekninger) {
        formaterStrekninger(strekninger);
    });
}

function formaterStrekninger(strekninger) {
    let ut = "";

    for (let strekning of strekninger) {
        ut += "<li><a class='dropdown-item' href='#'>" + strekning.navn + "</a></li>";
    }

    $("#strekningene").html(ut);
}