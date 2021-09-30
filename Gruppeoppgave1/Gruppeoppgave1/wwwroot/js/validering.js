let error = false;
const regexFornavn = /\b([A-ZÀ-ÿ][-a-z ]+[ ]*)+/;
const regexEtternavn = /\b([A-ZÀ-ÿ][-a-z ]+[ ]*)+/;
const regexEmail = /([\w\.\-]+)@([\w\-]+).(\w{2,3})/;

function validerForm() {
    const valgtStrekning = $('#strekningene').val();
    const valgtStartDato = $("#startdato").datepicker({ dateFormat: "dd-mm-yy" }).val();
    const valgtSluttDato = $("#sluttdato").datepicker({ dateFormat: "dd-mm-yy" }).val();
    const valgtAntallVoksne = $('#antallVoksne').val();
    const skrevetFornavn = $('#fornavn').val();
    const skrevetEtternavn = $('#etternavn').val();
    const skrevetEmail = $('#email').val();

    sjekkRegex(skrevetFornavn, regexFornavn, '#errorFornavn', "Fornavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
    sjekkRegex(skrevetEtternavn, regexEtternavn, '#errorEtternavn', "Etternavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
    sjekkRegex(skrevetEmail, regexEmail, '#errorEmail', "Email må inneholde '@' og '.' f.eks. 'eksempel@email.no'");

    ifValidering(valgtStrekning, null, '#errorStrekning');
    ifValidering(valgtStartDato, "", '#errorStartDato');
    ifValidering(valgtSluttDato, "", '#errorSluttDato');
    ifValidering(valgtAntallVoksne, 0, '#errorAntallVoksne');
    formValidering(skrevetFornavn, "", '#errorFornavn', "Du må skrive inn fornavn!");
    formValidering(skrevetEtternavn, "", '#errorEtternavn', "Du må skrive inn etternavn!");
    formValidering(skrevetEmail, "", '#errorEmail', "Du må skrive inn email!");

    if (error) {
        error = false;
        return false;
    }

    saveValues();

}

function validerBetalingForm() {


    for (let i = 1; i < sessionStorage.getItem("antallVoksne"); i++) {
        const skrevetFornavn = $('#fornavn' + (i + 1)).val();
        const skrevetEtternavn = $('#etternavn' + (i + 1)).val();
        const skrevetEmail = $('#email' + (i + 1)).val();

        sjekkRegex(skrevetFornavn, regexFornavn, '#errorFornavn' + (i + 1), "Fornavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
        sjekkRegex(skrevetEtternavn, regexEtternavn, '#errorEtternavn' + (i + 1), "Etternavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
        sjekkRegex(skrevetEmail, regexEmail, '#errorEmail' + (i + 1), "Email må inneholde '@' og '.' f.eks. 'eksempel@email.no'");

        formValidering(skrevetFornavn, "", '#errorFornavn' + (i + 1), "Du må skrive inn fornavn!");
        formValidering(skrevetEtternavn, "", '#errorEtternavn' + (i + 1), "Du må skrive inn etternavn!");
        formValidering(skrevetEmail, "", '#errorEmail' + (i + 1), "Du må skrive inn email!");
    }

    for (let i = 0; i < sessionStorage.getItem("antallBarn"); i++) {
        const skrevetFornavn = $('#fornavnBarn' + (i + 1)).val();
        const skrevetEtternavn = $('#etternavnBarn' + (i + 1)).val();
        const skrevetEmail = $('#emailBarn' + (i + 1)).val();

        sjekkRegex(skrevetFornavn, regexFornavn, '#errorFornavnBarn' + (i + 1), "Fornavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
        sjekkRegex(skrevetEtternavn, regexEtternavn, '#errorEtternavnBarn' + (i + 1), "Etternavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
        sjekkRegex(skrevetEmail, regexEmail, '#errorEmailBarn' + (i + 1), "Email må inneholde '@' og '.' f.eks. 'eksempel@email.no'");

        formValidering(skrevetFornavn, "", '#errorFornavnBarn' + (i + 1), "Du må skrive inn fornavn!");
        formValidering(skrevetEtternavn, "", '#errorEtternavnBarn' + (i + 1), "Du må skrive inn etternavn!");
        formValidering(skrevetEmail, "", '#errorEmailBarn' + (i + 1), "Du må skrive inn email!");
    }

    if (error) {
        error = false;
        return false;
    }
}

function saveValues() {
    sessionStorage.setItem("antallVoksne", $('#antallVoksne').val());
    sessionStorage.setItem("antallBarn", $('#antallBarn').val());
    sessionStorage.setItem("fornavn", $('#fornavn').val());
    sessionStorage.setItem("etternavn", $('#etternavn').val());
    sessionStorage.setItem("email", $('#email').val());
}

function sjekkRegex(variabel, regex, id, errorMsg) {
    if (variabel != "") {
        const regexOK = regex.test(variabel);
        if (!regexOK) {
            $(id).html(errorMsg);
            $(id).css({ visibility: "visible" });
            error = true;
        } else {
            $(id).css({ visibility: "hidden" });
        }
    }
}

function ifValidering(variabel, sjekk, id) {
    if (variabel == sjekk) {
        $(id).css({ visibility: "visible" });
        error=true;
    } else {
        $(id).css({ visibility: "hidden" });
    }
}

function formValidering(variabel, sjekk, id, errorMsg) {
    if (variabel == sjekk) {
        $(id).html(errorMsg);
        $(id).css({ visibility: "visible" });
        error = true;
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
        let maksdato = new Date(dato);
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