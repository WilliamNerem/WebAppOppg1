let antallVoksne;
let antallBarn;

$(function () {
    antallVoksne = localStorage.getItem("antallVoksne");
    antallBarn = localStorage.getItem("antallBarn");
    fornavn = localStorage.getItem("fornavn");
    etternavn = localStorage.getItem("etternavn");
    email = localStorage.getItem("email");
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
            "<p id='errorEmail" + (i + 1) + "' style='visibility: hidden; color: red'>Du må skrive inn email!</p>";
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
                "<p id='errorEtternavnBarn" + (i + 1) + "' style='visibility: hidden; color: red'>Du må skrive inn etternavn!</p>";
        }
    }

    $('#betalingForm').html(ut);
}