$ = window.jQuery = require("jquery");
var fs, st, sc, fc;
var tg, wr;
var mg, tw;
var slc, de, wc;
var ig, og;
var inputIds = ["fs", "st", "sc", "fc", "wr", "tw", "tg", "mg", "slc", "de", "wc"];
var motors = new Map([
    ["Falcon 500", [0, 0, 0, 0, 0]],
    ["CIM", [5330, 2.41, 131.00, 2.70, 336.29]],
    ["Mini CIM", [5840, 1.41, 89.00, 3.00, 215.58]],
    ["BAG Motor", [13180, 0.43, 53.00, 1.80, 148.37]],
    ["775 pro", [18730, 0.71, 134.00, 0.70, 348.15]],
    ["AM 775", [5800, 0.28, 18.00, 1.60, 42.52]],
    ["AM 9015", [14270, 0.36, 71, 3.7, 134.49]],
    ["1 CIM, 1 Mini CIM", [5508, 3.82, 220, 8.16, 550.84]],
    ["1 CIM, 2 Mini CIM", [5593, 5.23, 309, 9.62, 765.80]],
    ["2 CIM, 1 Mini CIM", [5437, 6.23, 351, 9.15, 886.78]],
    ["BB RS-775-18", [13050, 0.72, 97.00, 2.70, 245.99]],
    ["BB RS-550", [19000, 0.38, 84.00, 0.40, 189.02]]
]);
$(document).ready(function () {
    var inputs = inputIds.map(function (id) { return $("#" + id); });
    $("#add_gear").click(function () { addGear(); });
    $("#rm_gear").click(function () {
        $('#gears_table>tbody').children().last().remove();
        if ($("#gears_table>tbody").children().length == 0) {
            addGear()
        }
    });
    $("#motor_sl").click(getMotorStats);
    $(document).on("change", "input", update);
    addGear(12, 84);
    addGear(40, 20);
    getMotorStats();
    update();
    function addGear(g1, g2) {
        g1 = g1 ? g1 : 1;
        g2 = g2 ? g2 : 1;
        var gear = $("<tr>" +
            '<td><input class="gear_val var driving form-control input-sm" scope="row" type="number" value="' +
            g1 +
            '" min="1"></td>' +
            '<td><input class="gear_val var driven form-control" type="number" value="' +
            g2 +
            '" min="1"></td>' +
            "</tr>");
        $("#gear_body").append(gear);
    }
    function getMotorStats() {
        var motor = $("#motor_sl").val();
        var data = motors.get(motor);
        inputs[0].val(data[0]);
        inputs[1].val(data[1]);
        inputs[2].val(data[2]);
        inputs[3].val(data[3]);
        update();
    }
    function update() {
        // console.log("update");
        fs = +inputs[0].val(); st = +inputs[1].val();
        sc = +inputs[2].val(); fc = +inputs[3].val();

        wr = +inputs[4].val() * 0.0254;
        tw = +inputs[5].val();

        tg = +inputs[6].val();
        mg = +inputs[7].val();

        slc = +inputs[8].val();
        de = +inputs[9].val();
        wc = +inputs[10].val();

        ig = 1; og = 1;
        $(".driving").each(function (gear) { ig *= +$(this).val(); });
        $(".driven").each(function (gear) { og *= +$(this).val(); });

        console.log(fs, st, sc, fc, tg, wr, mg, tw, slc, de, wc, ig, og)

        var dfs = freeSpeed();
        var cdpm = currentDrawPerMotor();

        // console.log(cdpm * mg * tw);

        $("#dfs").text(round(dfs, 3) + " ft/s");
        $("#das").text(round(dfs * slc, 3) + " ft/s");
        $("#cdpm").text(round(cdpm, 3) + " amps");
        $("#tcd").text(round(cdpm * mg * tw, 3) + " amps"); //check
    }
    function round(val, num) {
        return Math.round(val * Math.pow(10, num)) / Math.pow(10, num);
    }
    function freeSpeed() {
        return fs * (wr * 2 * Math.PI) / (0.3048 * 60) * ig / og;
    }
    function currentDrawPerMotor() {
        // console.log(sc, fc, st, tw, tg, wr, de, mg)
        console.log(((sc - fc) / st) * tw);
        return ((sc - fc) / st * tw * wc / tg * 4.44822161526 * wr / de / mg * ig / og) + fc;
    }
});
//# sourceMappingURL=renderer.js.map