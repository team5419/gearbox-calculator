window.$ = window.jQuery = require("jquery");
let fs, st, sc, fc, slc, de, tg, mg, tw, wr, wc;
let inputs = ["fs", "st", "sc", "fc", "slc", "de", "mg", "tg", "mg", "tw", "wr", "wc"];

$(document).ready(() => {
  inputs = inputs.map(id => $("#" + id));
  $("#add_gear").click(() => {
    addGear();
  });
  $("#rm_gear").click(() => {
    if ($("#gears_table>tbody").children().length > 1) {
      $('#gears_table>tbody').children().last().remove();
    }
  })
  $("#motor_sl").click(getMotorStats);
  $(document).on("change", "input", update);
  addGear(12, 84);
  addGear(40, 20);
  getMotorStats();
  update();

  function addGear(g1, g2) {
    g1 = g1 == undefined ? 1 : g1;
    g2 = g2 == undefined ? 1 : g2;
    let gear = $(
      "<tr>" +
      '<td><input class="gear_val var driving form-control input-sm" scope="row" type="number" value="' +
      g1 +
      '" min="1"></td>' +
      '<td><input class="gear_val var driven form-control" type="number" value="' +
      g2 +
      '" min="1"></td>' +
      "</tr>"
    );
    $("#gear_body").append(gear);
  }

  function getMotorStats() {
    let data = motors[$("#motor_sl").val()];
    inputs[0].val(data[0]);
    inputs[1].val(data[1]);
    inputs[2].val(data[2]);
    inputs[3].val(data[3]);
    update()
  }

  function update() {
    console.log("update");
    fs = inputs[0].val(); st = inputs[1].val();
    sc = inputs[2].val(); fc = inputs[3].val();

    tg = inputs[6].val(); wr = inputs[10].val();

    mg = inputs[7].val();
    tw = inputs[8].val();

    slc = inputs[4].val();
    de = inputs[5].val();
    wc = inputs[11].val();

    ig = 1; og = 1;
    $(".driving").each(function (gear) { ig *= this.value; });
    $(".driven").each(function (gear) { og *= this.value; });

    let dfs = freeSpeed(fs, wr, ig, og);
    let tcd = totalCurrentDraw(sc, fc, st, tw, tg, wr, de, mg, ig, og);
    console.log(tcd)
    $("#dfs").text(round(dfs, 3) + " ft/s");
    $("#das").text(round(dfs * slc, 3) + " ft/s");
    $("#tcd").text(round(tcd, 3) + " amps");
    $("#cdpm").text(round(cdpm, 3) + " amps");
  }

  function round(val, num) {
    // console.log(num, Math.pow)
    return Math.round(val * Math.pow(10, num)) / Math.pow(10, num)
  }

  function freeSpeed(fs, wr, ig, og) {
    return fs * ((wr * 0.0254) * 2 * Math.PI) / (0.3048 * 60) * ig / og
  }

  function totalCurrentDraw(sc, fc, st, tw, tg, wr, de, mg, ig, og) {
    console.log(sc, fc, st, tw, tg, wr, de, mg, ig, og)
    return ((sc - fc) / st * tw * wc / tg * 4.44822161526 * wr * 0.0254 / de / mg * ig / og) + fc;
  }
});
