$(function () {
    hentAlleStrekninger();
    datepicker();
});

function hentAlleStrekninger() {
    $.get("strekning/hentalle", function (strekninger) {
        formaterStrekninger(strekninger);
    });
}

function formaterStrekninger(strekninger) {
    let ut = "<option disabled selected value> -- velg en strekning -- </option>";

    for (let strekning of strekninger) {
        ut += "<option value='" + strekning.id + "' class='dropdown-item'>" + strekning.navn + "</option>";
    }

    $("#strekningene").html(ut);
}

function hentPris() {
    const prisVoksne = $('#antallVoksne').val();
    const antallBarn = $('#antallBarn').val();
    let prisBarn = 0;
    if (antallBarn != 0) {
        prisBarn = antallBarn / 2;
    }
    const pris = parseInt(prisVoksne) + parseFloat(prisBarn);
    const value = $('#strekningene').val();
    const url = "Strekning/HentEn?id=" + value;

    $.get(url, function (strekning) {
        $("#pris").html(strekning.pris * pris);
    });
}