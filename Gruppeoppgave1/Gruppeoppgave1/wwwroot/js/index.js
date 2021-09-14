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
    let error = false;

    console.log(valgtStartDato);

    if (valgtStrekning == null) {
        $('#errorStrekning').css({ visibility: "visible" });
        error = true;
    } else {
        $('#errorStrekning').css({ visibility: "hidden" });
    }

    if (valgtStartDato == "") {
        $('#errorStartDato').css({ visibility: "visible" });
        error = true;
    } else {
        $('#errorStartDato').css({ visibility: "hidden" });
    }

    if (valgtSluttDato == "") {
        $('#errorSluttDato').css({ visibility: "visible" });
        error = true;
    } else {
        $('#errorSluttDato').css({ visibility: "hidden" });
    }

    if (valgtAntallVoksne == 0) {
        $('#errorAntallVoksne').css({ visibility: "visible" });
        error = true;
    } else {
        $('#errorAntallVoksne').css({ visibility: "hidden" });
    }

    if (error) {
        return false;
    }
}