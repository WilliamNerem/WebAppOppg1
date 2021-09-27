let error = false;

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

function validerForm() {
    const valgtStrekning = $('#strekningene').val();
    const valgtStartDato = $("#startdato").datepicker({ dateFormat: "dd-mm-yy" }).val();
    const valgtSluttDato = $("#sluttdato").datepicker({ dateFormat: "dd-mm-yy" }).val();
    const valgtAntallVoksne = $('#antallVoksne').val();
    const skrevetFornavn = $('#fornavn').val();
    const skrevetEtternavn = $('#etternavn').val();
    const skrevetEmail = $('#email').val();

    ifValidering(valgtStrekning, null, '#errorStrekning');
    ifValidering(valgtStartDato, "", '#errorStartDato');
    ifValidering(valgtSluttDato, "", '#errorSluttDato');
    ifValidering(valgtAntallVoksne, 0, '#errorAntallVoksne');
    ifValidering(skrevetFornavn, "", '#errorFornavn');
    ifValidering(skrevetEtternavn, "", '#errorEtternavn');
    ifValidering(skrevetEmail, "", '#errorEmail');

    if (error) {
        return false;
    }

}

function ifValidering(variabel, sjekk, id) {
    if (variabel == sjekk) {
        $(id).css({ visibility: "visible" });
        error = true;
    } else {
        $(id).css({ visibility: "hidden" });
    }
}

function datepicker() {
    $("#startdato").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: 0,
        maxDate: 60,
    })
}

function datepickerSlutt() {
    let datoParts = $("#startdato").val().split("-");
    datoParts[1] = datoParts[1] - 1;

    let dato = new Date(datoParts[2], datoParts[1], datoParts[0]);
    let maksdato = new Date();
    maksdato.setDate(dato.getDate() + 10);

    $('#sluttdato').datepicker("destroy");
    $('#sluttdato').val('');
    $("#sluttdato").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: dato,
        maxDate: maksdato
    });
}