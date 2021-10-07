$(function () {
    hentAlleStrekninger();
    datepicker();
    inputDesignIndex();
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

function inputDesignIndex() {
    document.getElementById('fodselsdato').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '').trim();
    });
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
        const totalpris = strekning.pris * pris;
        const valgtStrekning = strekning.navn;
        sessionStorage.setItem("valgtStrekning", valgtStrekning);
        if ($("#turvalg option:selected").val() === "Tur/Retur") {
            $("#pris").html("Pris: " + totalpris * 2 + "kr");
            sessionStorage.setItem("totalpris", totalpris * 2);
        } else {
            $("#pris").html("Pris: " + totalpris + "kr");
            sessionStorage.setItem("totalpris", totalpris);
        }
    });
}