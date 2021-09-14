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
    const value = $('#strekningene').val();
    const url = "Strekning/HentEn?id=" + value;

    $.get(url, function (strekning) {
        $("#pris").html(strekning.pris);
    });
}

function datepicker() {
    $("#startdate").datepicker({ dateFormat: "dd-mm-yy" }).val();

    $("#enddate").datepicker({ dateFormat: "dd-mm-yy" }).val();
};