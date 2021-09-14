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

function datepicker() {
    $("#startdate").datepicker({ dateFormat: "dd-mm-yy" }).val();

    $("#enddate").datepicker({ dateFormat: "dd-mm-yy" }).val();
}

function validerForm() {
    const valgtStrekning = $('#strekningene').val();
    const valgtStartDato = $("#startdate").datepicker({ dateFormat: "dd-mm-yy" }).val();
    const valgtSluttDato = $("#enddate").datepicker({ dateFormat: "dd-mm-yy" }).val();
    const valgtAntallVoksne = $('#antallVoksne').val();
    const skrevetFornavn = $('#fornavn').val();
    const skrevetEtternavn = $('#etternavn').val();
    const skrevetEmail = $('#email').val();
    let error = false;

    error = ifValidering(valgtStrekning, null, '#errorStrekning');
    error = ifValidering(valgtStartDato, "", '#errorStartDato');
    error = ifValidering(valgtSluttDato, "", '#errorSluttDato');
    error = ifValidering(valgtAntallVoksne, 0, '#errorAntallVoksne');
    error = ifValidering(skrevetFornavn, "", '#errorFornavn');
    error = ifValidering(skrevetEtternavn, "", '#errorEtternavn');
    error = ifValidering(skrevetEmail, "", '#errorEmail');
    
    if (error) {
        return false;
    }
}

function ifValidering(variabel, sjekk, id) {
    if (variabel == sjekk) {
        $(id).css({ visibility: "visible" });
        return true;
    } else {
        $(id).css({ visibility: "hidden" });
    }
}