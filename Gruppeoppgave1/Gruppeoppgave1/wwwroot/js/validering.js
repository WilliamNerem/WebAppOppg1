let error = false;
const regexFornavn = /\b([A-ZÀ-ÿ][-a-z ]+[ ]*)+/;
const regexEtternavn = /\b([A-ZÀ-ÿ][-a-z ]+[ ]*)+/;
const regexEmail = /([\w\.\-]+)@([\w\-]+).(\w{2,3})/;
const regexFodselsdato = /(((0[1-9]|[12][0-9]|3[01])-(0[13578]|10|12)-(\b([1][9][0-9][0-9]|[2][0][0-1][0-9]|[2][0][2][0])\b))|(([0][1-9]|[12][0-9]|30)-(0[469]|11)-(\b([1][9][0-9][0-9]|[2][0][0-1][0-9]|[2][0][2][0])\b))|((0[1-9]|1[0-9]|2[0-8])-(02)-(\b([1][9][0-9][0-9]|[2][0][0-1][0-9]|[2][0][2][0])\b))|((29)(\/)(02)-([02468][048]00))|((29)-(02)-([13579][26]00))|((29)-(02)-([0-9][0-9][0][48]))|((29)-(02)-([0-9][0-9][2468][048]))|((29)-(02)-([0-9][0-9][13579][26])))/;
const regexKortnr = /\b[0-9]{4}[ ][0-9]{4}[ ][0-9]{4}[ ][0-9]{4}\b/;
const regexUtlopsdato = /\b([0][1-9][/][2][2-9]|[1][0-2][/][2][2-9]|[1][0-2][/][2][1])\b/;
const regexCVC = /\b[0-9][0-9][0-9]\b/;

function validerForm() {
    const valgtStrekning = $('#strekningene').val();
    const valgtStartDato = $("#startdato").datepicker({ dateFormat: "dd-mm-yy" }).val();
    const valgtSluttDato = $("#sluttdato").datepicker({ dateFormat: "dd-mm-yy" }).val();
    const valgtAntallVoksne = $('#antallVoksne').val();
    const skrevetFornavn = $('#fornavn').val();
    const skrevetEtternavn = $('#etternavn').val();
    const skrevetEmail = $('#email').val();
    const skrevetFodselsdato = $('#fodselsdato').val();

    sjekkRegex(skrevetFornavn, regexFornavn, '#errorFornavn', "Fornavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
    sjekkRegex(skrevetEtternavn, regexEtternavn, '#errorEtternavn', "Etternavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
    sjekkRegex(skrevetEmail, regexEmail, '#errorEmail', "Email må inneholde '@' og '.' f.eks. 'eksempel@email.no'");
    sjekkRegex(skrevetFodselsdato, regexFodselsdato, '#errorFodselsdato', "Fødselsdato må være gyldig og på formatet: 'DD-MM-ÅÅÅÅ'");

    ifValidering(valgtStrekning, null, '#errorStrekning');
    ifValidering(valgtStartDato, "", '#errorStartDato');
    if ($("#turvalg option:selected").val() === "Tur/Retur") {
        ifValidering(valgtSluttDato, "", '#errorSluttDato');
    }
    ifValidering(valgtAntallVoksne, 0, '#errorAntallVoksne');
    formValidering(skrevetFornavn, "", '#errorFornavn', "Du må skrive inn fornavn!");
    formValidering(skrevetEtternavn, "", '#errorEtternavn', "Du må skrive inn etternavn!");
    formValidering(skrevetEmail, "", '#errorEmail', "Du må skrive inn email!");
    formValidering(skrevetFodselsdato, "", '#errorFodselsdato', "Du må skrive inn fødselsdato!");
    

    if (error) {
        error = false;
        return false;
    }

    saveValues();

}

function validerInformasjonsForm() {


    for (let i = 1; i < sessionStorage.getItem("antallVoksne"); i++) {
        const skrevetFornavn = $('#fornavn' + (i + 1)).val();
        const skrevetEtternavn = $('#etternavn' + (i + 1)).val();
        const skrevetEmail = $('#email' + (i + 1)).val();
        const skrevetFodselsdato = $('#fodselsdato' + (i + 1)).val();

        sjekkRegex(skrevetFornavn, regexFornavn, '#errorFornavn' + (i + 1), "Fornavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
        sjekkRegex(skrevetEtternavn, regexEtternavn, '#errorEtternavn' + (i + 1), "Etternavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
        sjekkRegex(skrevetEmail, regexEmail, '#errorEmail' + (i + 1), "Email må inneholde '@' og '.' f.eks. 'eksempel@email.no'");
        sjekkRegex(skrevetFodselsdato, regexFodselsdato, '#errorFodselsdato' + (i + 1), "Fødselsdato må være gyldig og på formatet: 'DD-MM-ÅÅÅÅ'");

        formValidering(skrevetFornavn, "", '#errorFornavn' + (i + 1), "Du må skrive inn fornavn!");
        formValidering(skrevetEtternavn, "", '#errorEtternavn' + (i + 1), "Du må skrive inn etternavn!");
        formValidering(skrevetEmail, "", '#errorEmail' + (i + 1), "Du må skrive inn email!");
        formValidering(skrevetFodselsdato, "", '#errorFodselsdato' + (i + 1), "Du må skrive inn fødselsdato!");
    }

    for (let i = 0; i < sessionStorage.getItem("antallBarn"); i++) {
        const skrevetFornavn = $('#fornavnBarn' + (i + 1)).val();
        const skrevetEtternavn = $('#etternavnBarn' + (i + 1)).val();
        const skrevetFodselsdato = $('#fodselsdatoBarn' + (i + 1)).val();

        sjekkRegex(skrevetFornavn, regexFornavn, '#errorFornavnBarn' + (i + 1), "Fornavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
        sjekkRegex(skrevetEtternavn, regexEtternavn, '#errorEtternavnBarn' + (i + 1), "Etternavn må starte med stor bokstav. Gyldige tegn: - og mellomrom");
        sjekkRegex(skrevetFodselsdato, regexFodselsdato, '#errorFodselsdatoBarn' + (i + 1), "Fødselsdato må være gyldig og på formatet: 'DD-MM-ÅÅÅÅ'");

        formValidering(skrevetFornavn, "", '#errorFornavnBarn' + (i + 1), "Du må skrive inn fornavn!");
        formValidering(skrevetEtternavn, "", '#errorEtternavnBarn' + (i + 1), "Du må skrive inn etternavn!");
        formValidering(skrevetFodselsdato, "", '#errorFodselsdatoBarn' + (i + 1), "Du må skrive inn fødselsdato!");
    }

    if (error) {
        error = false;
        return false;
    }
}

function validerBetalingsForm() {
    const skrevetKortnr = $('#kortNr').val();
    const skrevetUtlopsdato = $('#utlopsdato').val();
    const skrevetCVC = $('#cvc').val();

    sjekkRegex(skrevetKortnr, regexKortnr, '#errorKortnummer', "Kortnummer må være gyldig og på formatet: 'XXXX XXXX XXXX XXXX'");
    sjekkRegex(skrevetUtlopsdato, regexUtlopsdato, '#errorUtlopsdato', "Utløpsdato må være gyldig og på formatet: 'MM/ÅÅ'");
    sjekkRegex(skrevetCVC, regexCVC, '#errorCVC', "CVC må være gyldig og på tre sifre");
    console.log(error);

    formValidering(skrevetKortnr, "", '#errorKortnummer', "Du må skrive inn kortnummer!");
    formValidering(skrevetUtlopsdato, "", '#errorUtlopsdato', "Du må skrive inn utløpsdato!");
    formValidering(skrevetCVC, "", '#errorCVC', "Du må skrive inn CVC!");
    console.log(error);

    if (error) {
        error = false;
        return false;
    }
}

function saveValues() {
    sessionStorage.setItem("strekning", $('#strekningene').val());
    sessionStorage.setItem("antallVoksne", $('#antallVoksne').val());
    sessionStorage.setItem("antallBarn", $('#antallBarn').val());
    sessionStorage.setItem("fornavn", $('#fornavn').val());
    sessionStorage.setItem("etternavn", $('#etternavn').val());
    sessionStorage.setItem("email", $('#email').val());
    sessionStorage.setItem("startdato", $('#startdato').val());
    sessionStorage.setItem("sluttdato", $('#sluttdato').val());
    sessionStorage.setItem("fodselsdato", $('#fodselsdato').val());
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
    $('#errorSluttDato').css({ visibility: "hidden" });
    $('#sluttdato').val('');
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