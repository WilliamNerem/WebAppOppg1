let antallVoksne;
let antallBarn;
let antallVoksneTeller = 1;
let antallBarnTeller = 0;

$(function () {

    antallVoksne = sessionStorage.getItem("antallVoksne");
    antallBarn = sessionStorage.getItem("antallBarn");
    fornavn = sessionStorage.getItem("fornavn");
    etternavn = sessionStorage.getItem("etternavn");
    email = sessionStorage.getItem("email");
    fodselsdato = sessionStorage.getItem("fodselsdato");

    if (
        fornavn == null ||
        etternavn == null ||
        email == null
    ) {
        this.location.href = '../index.html';
    }
    renderForm();
});


function inputDesignReisendeInformasjon() {
    if (antallVoksne > 1) {
        for (let i = 1; i < antallVoksne; i++) {
            document.getElementById('fodselsdato' + (i + 1)).addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '').trim();
            });
        }
    }
    if (antallBarn > 0) {
        for (let i = 0; i < antallBarn; i++) {
            document.getElementById('fodselsdatoBarn' + (i + 1)).addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '').trim();
            });
        }
    }

    
}

function renderForm() {
    let ut = "<div class='row reisendeInformasjon-container g-2 form-container' style='margin-right: 14px'>" +
        "<h5>Voksen " + 1 + ":</h5>" +
        "<div class='col-6 row' style='margin-right: 10px;'>" +
        "<label class='form-label'>Fornavn:</label>" +
        "<input id='fornavn' class='form-control' type='text' value='" + fornavn + "' readonly />" +
        "<div style='height: 46px'></div>" +
        "<label class='form-label'>E-post:</label>" +
        "<input id='email' class='form-control' type='text' value='" + email + "' readonly/>" +
        "<div style='height: 46px'></div>" +
        "</div>" +
        "<div class='col-6 row'>" +
        "<label class='form-label'>Etternavn:</label>" +
        "<input id='etternavn' class='form-control' type='text' value='" + etternavn + "' readonly />" +
        "<div style='height: 46px'></div>" +
        "<label class='form-label'>Fødselsdato:</label>" +
        "<input id='fodselsdato' class='form-control' type='text' value='" + fodselsdato +"' placeholder='DD-MM-ÅÅÅÅ' readonly/>" +
        "<div style='height: 46px'></div>" +
        "</div>" +
        "</div>";
    if (antallVoksne > 1) {
        for (let i = 1; i < antallVoksne; i++) {
            antallVoksneTeller++;
            ut += "<div class='reisendeInformasjon-container row g-2 form-container' style='margin-right: 14px'>" +
                "<h5>Voksen " + (i + 1) + ":</h5>" +
                "<div class='col-6 row' style='margin-right: 10px;'>" +
                "<label class='form-label'>Fornavn:</label>" +
                "<input id='fornavn" + (i + 1) + "' class='form-control' type='text' placeholder='Fornavn' autocomplete='given-name'/>" +
                "<div id='errorFornavn" + (i + 1) + "' class='form-text' style='visibility: hidden; color: red'>Du må skrive inn fornavn!</div>" +
                "<label class='form-label'>E-post:</label>" +
                "<input id='email" + (i + 1) + "' class='form-control' type='text' placeholder='E-post' autocomplete='email' />" +
                "<div id='errorEmail" + (i + 1) + "' class='form-text' style='visibility: hidden; color: red'>Du må skrive inn e-post!</div>" +
                "</div>" +
                "<div class='col-6 row'>" +
                "<label class='form-label'>Etternavn:</label>" +
                "<input id='etternavn" + (i + 1) + "' class='form-control' type='text' placeholder='Etternavn' autocomplete='family-name'/>" +
                "<div id='errorEtternavn" + (i + 1) + "' class='form-text' style='visibility: hidden; color: red'>Du må skrive inn etternavn!</div>" +
                "<label class='form-label'>Fødselsdato:</label>" +
                "<input id='fodselsdato" + (i + 1) + "' maxlength='10' class='form-control' type='text' placeholder='DD/MM/ÅÅÅÅ' autocomplete='bday'/>" +
                "<div id='errorFodselsdato" + (i + 1) + "' class='form-text' style='visibility: hidden; color: red'>Du må skrive inn fødselsdato!</div>" +
                "</div>" +
                "</div>";
        }
    }

    let utBarn = "";

    if (antallBarn > 0) {
        $('#infoBarn').html("<h3 style='text-align: center'>Skriv inn informasjon om barn:</h3><br/>");
        for (let i = 0; i < antallBarn; i++) {
            utBarn += "<div class='row reisendeInformasjon-container g-2 form-container' style='margin-right: 14px'>" +
                "<h5>Barn " + (i + 1) + ":</h5> <br/>" +
                "<div class='col-6 row' style='margin-right: 10px;'>" +
                "<label class='form-label'>Fornavn:</label>" +
                "<input id='fornavnBarn" + (i + 1) + "' class='form-control' type='text' placeholder='Fornavn' autocomplete='given-name' />" +
                "<div id='errorFornavnBarn" + (i + 1) + "' class='form-text' style='visibility: hidden; color: red'>Du må skrive inn fornavn!</div>" +
                "<label class='form-label'>Fødselsdato:</label>" +
                "<input id='fodselsdatoBarn" + (i + 1) + "' maxlength='10' class='form-control' type='text' placeholder='DD/MM/ÅÅÅÅ' autocomplete='bday'/>" +
                "<div id='errorFodselsdatoBarn" + (i + 1) + "' class='form-text' style='visibility: hidden; color: red'>Du må skrive inn fødselsdato!</div>" +
                "</div>" +
                "<div class='row col-6'>" +
                "<label class='form-label'>Etternavn:</label>" +
                "<input id='etternavnBarn" + (i + 1) + "' class='form-control' type='text' placeholder='Etternavn' autocomplete='family-name'/>" +
                "<div id='errorEtternavnBarn" + (i + 1) + "' class='form-text' style='visibility: hidden; color: red'>Du må skrive inn etternavn!</div>" +
                "<div style='height: 116px'></div>" +
                "</div>" +
                "</div>";
        }
    }

    $('#betalingForm').html(ut);
    $('#betalingFormBarn').html(utBarn);
    inputDesignReisendeInformasjon();
}