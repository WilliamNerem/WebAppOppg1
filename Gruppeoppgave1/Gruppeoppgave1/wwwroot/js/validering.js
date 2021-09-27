let error = false;

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

    saveValues();

}

function saveValues() {
    localStorage.setItem("antallVoksne", $('#antallVoksne').val());
    localStorage.setItem("antallBarn", $('#antallBarn').val());
    localStorage.setItem("fornavn", $('#fornavn').val());
    localStorage.setItem("etternavn", $('#etternavn').val());
    localStorage.setItem("email", $('#email').val());
}

function ifValidering(variabel, sjekk, id) {
    if (variabel == sjekk) {
        $(id).css({ visibility: "visible" });
        error=true;
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
    $("#sluttdato").css({ visibility: "hidden" });
    $("#labeltildato").css({ visibility: "hidden" });
    if ($("#turvalg option:selected").val() === "Tur/Retur") {
        $("#labeltildato").css({ visibility: "visible" });
        $("#sluttdato").css({ visibility: "visible" });
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
}