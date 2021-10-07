$(function () {
    inputDesign();
});

function inputDesign() {
    document.getElementById('kortNr').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    });
    document.getElementById('utlopsdato').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '').trim();
    });
}