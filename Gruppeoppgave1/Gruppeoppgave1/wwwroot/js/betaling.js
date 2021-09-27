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
            "<input id='fornavn' type='text' placeholder='Fornavn' pattern='\b([A-ZÀ-ÿ][-a-z ]+[ ]*)+' title='Fornavn starter med stor bokstav. Gyldige tegn: - og mellomrom' />" +
            "<p id='errorFornavn' style='visibility: hidden; color: red'>Du må skrive inn ditt fornavn!</p>" +
            "<label>Etternavn:</label>" +
            "<input id='etternavn' type='text' placeholder='Etternavn' pattern='\b([A-ZÀ-ÿ][-a-z ]+[ ]*)+' title='Etternavn starter med stor bokstav. Gyldige tegn: - og mellomrom' />" +
            "<p id='errorEtternavn' style='visibility: hidden; color: red'>Du må skrive inn ditt etternavn!</p>" +
            "<label>Email:</label>" +
            "<input id='email' type='text' placeholder='Email' pattern='([\w\.\-]+)@([\w\-]+).(\w{2,3})' title='Email må inneholde '@' og '.' f.eks. 'eksempel@email.no''/>" +
            "<p id='errorEmail' style='visibility: hidden; color: red'>Du må skrive inn din email!</p>";
    }
    if (antallBarn > 0) {
        ut += "<h3>Skriv inn informasjon om barn:</h3><br/>";
        for (let i = 0; i < antallBarn; i++) {
            ut += "<h5>Barn " + (i + 1) + ":</h5> <br/>" +
                "<label>Fornavn:</label>" +
                "<input id='fornavn' type='text' placeholder='Fornavn' pattern='\b([A-ZÀ-ÿ][-a-z ]+[ ]*)+' title='Fornavn starter med stor bokstav. Gyldige tegn: - og mellomrom' />" +
                "<p id='errorFornavn' style='visibility: hidden; color: red'>Du må skrive inn ditt fornavn!</p>" +
                "<label>Etternavn:</label>" +
                "<input id='etternavn' type='text' placeholder='Etternavn' pattern='\b([A-ZÀ-ÿ][-a-z ]+[ ]*)+' title='Etternavn starter med stor bokstav. Gyldige tegn: - og mellomrom' />" +
                "<p id='errorEtternavn' style='visibility: hidden; color: red'>Du må skrive inn ditt etternavn!</p>";
        }
    }

    $('#betalingForm').html(ut);
}