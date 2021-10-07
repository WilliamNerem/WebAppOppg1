const strekning = sessionStorage.getItem("strekning");
const fornavn = sessionStorage.getItem("fornavn");
const etternavn = sessionStorage.getItem("etternavn");
const email = sessionStorage.getItem("email");
const startdato = sessionStorage.getItem("startdato");
const sluttdato = sessionStorage.getItem("sluttdato");
const antallVoksne = sessionStorage.getItem("antallVoksne");
const antallBarn = sessionStorage.getItem("antallBarn");
const totalpris = sessionStorage.getItem("totalpris");
const valgtStrekning = sessionStorage.getItem("valgtStrekning");
console.log(valgtStrekning)

$(() => {
    renderSummary();
})


const renderSummary = () => {

    let ut = "<div class='col-6 border p-3'><b>Navn:</b> " + fornavn + " " + etternavn + "</div>";
    ut += "<div class='col-6 border p-3'><b>E-post:</b> " + email + "</div>";
    ut += "<div class='col-12 border p-3'><b>Strekning:</b> " + valgtStrekning + "</div>";
    ut += "<div class='col-6 border p-3'><b>Utreise dato:</b> " + startdato + "</div>";
    ut += "<div class='col-6 border p-3'><b>Innreise dato:</b> " + sluttdato + "</div>";
    ut += "<div class='col-4 border p-3'><b>Antall voksne:</b> " + antallVoksne + "</div>";
    ut += "<div class='col-4 border p-3'><b>Antall barn:</b> " + antallBarn + "</div>";
    ut += "<div class='col-4 border p-3'><b>Totalt antall reisende:</b> " + (parseFloat(antallVoksne) + parseFloat(antallBarn)) + "</div>";

    $("#confirmText").html("Bestilling gjennomført! En bekreftelse har blitt sendt til " + email);
    $("#refnr").html("Referansenummer: " + Math.floor((Math.random() * 10000) + 1));
    $("#output").html(ut);
    $("#price").html("<b>Total pris inkl. moms:</b> " + totalpris + ",-");
}

