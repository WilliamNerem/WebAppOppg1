let antallVoksne;
let antallBarn;

$(function () {

    antallVoksne = sessionStorage.getItem("antallVoksne");
    antallBarn = sessionStorage.getItem("antallBarn");
    fornavn = sessionStorage.getItem("fornavn");
    etternavn = sessionStorage.getItem("etternavn");
    email = sessionStorage.getItem("email");

    if (
        fornavn == null ||
        etternavn == null ||
        email == null
    ) {
        this.location.href = '../index.html';
    }
    renderForm();
});

function renderForm() {
    let ut = "<h3>Skriv inn informasjon om voksne:</h3><br/>";

    ut += "<h5>Voksen " + 1 + ":</h5> <br/>" +
        "<label>Fornavn:</label>" +
        "<input id='fornavn' type='text' value='" + fornavn + "' readonly /><br/><br/>" +
        "<label>Etternavn:</label>" +
        "<input id='etternavn' type='text' value='" + etternavn + "' readonly /><br/><br/>" +
        "<label>Email:</label>" +
        "<input id='email' type='text' value='" + email + "' readonly/><br/><br/>";

    for (let i = 1; i < antallVoksne; i++) {
        ut += "<h5>Voksen " + (i + 1) + ":</h5> <br/>" +
            "<label>Fornavn:</label>" +
            "<input id='fornavn" + (i + 1) + "' type='text' placeholder='Fornavn'/>" +
            "<p id='errorFornavn" + (i + 1) + "' style='visibility: hidden; color: red'>Du må skrive inn fornavn!</p>" +
            "<label>Etternavn:</label>" +
            "<input id='etternavn" + (i + 1) + "' type='text' placeholder='Etternavn' />" +
            "<p id='errorEtternavn" + (i + 1) + "' style='visibility: hidden; color: red'>Du må skrive inn etternavn!</p>" +
            "<label>Email:</label>" +
            "<input id='email" + (i + 1) + "' type='text' placeholder='Email' />" +
            "<p id='errorEmail" + (i + 1) + "' style='visibility: hidden; color: red'>Du må skrive inn email!</p>" +
            "<label>Fødselsdato:</label>" +
            "<input id='fodselsdato" + (i + 1) + "' type='text' placeholder='DD-MM-ÅÅÅÅ' />" +
            "<p id='errorFodselsdato" + (i + 1) + "' style='visibility: hidden; color: red'>Du må skrive inn fødselsdato!</p>";
    }
    if (antallBarn > 0) {
        ut += "<h3>Skriv inn informasjon om barn:</h3><br/>";
        for (let i = 0; i < antallBarn; i++) {
            ut += "<h5>Barn " + (i + 1) + ":</h5> <br/>" +
                "<label>Fornavn:</label>" +
                "<input id='fornavnBarn" + (i + 1) + "' type='text' placeholder='Fornavn' />" +
                "<p id='errorFornavnBarn" + (i + 1) + "' style='visibility: hidden; color: red'>Du må skrive inn fornavn!</p>" +
                "<label>Etternavn:</label>" +
                "<input id='etternavnBarn" + (i + 1) + "' type='text' placeholder='Etternavn' />" +
                "<p id='errorEtternavnBarn" + (i + 1) + "' style='visibility: hidden; color: red'>Du må skrive inn etternavn!</p>" +
                "<label>Fødselsdato:</label>" +
                "<input id='fodselsdatoBarn" + (i + 1) + "' type='text' placeholder='DD-MM-ÅÅÅÅ' />" +
                "<p id='errorFodselsdatoBarn" + (i + 1) + "' style='visibility: hidden; color: red'>Du må skrive inn fødselsdato!</p>";
        }
    }

    $('#betalingForm').html(ut);
}