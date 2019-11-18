window.$ = window.jQuery = require('jquery');
let fs, st, sc, fc, slc, de, tg, mg, tw, wa, wd, wc;
let inputs = ['fs', 'st', 'sc', 'fc', 'slc', 'de', 'tg', 'mg', 'tw', 'wa', 'wd', 'wc'];

$( document ).ready(() => {
    inputs = inputs.map((id) => ($("#" + id)));
    $('#add_gear').click(() => {addGear()});
    $('#motor_sl').click(getMotorStats);
    $(document).on('change', 'input', update)
    addGear(12, 84);
    addGear(40, 20);
    getMotorStats()
    update();

    function addGear(g1, g2){
        g1 = g1 == undefined ? 1 : g1
        g2 = g2 == undefined ? 1 : g2
        console.log(g1, g2);
        let gear = 
            $('<tr>' +
                '<td><input class="gear_val var driving" type="number" value="' + g1 + '" min="1"></td>' + 
                '<td><input class="gear_val var driven" type="number" value="' + g2 + '" min="1"></td>' +
            '</tr>');
        $('#gear_body').append(gear);
    }
    function getMotorStats() {
        let data = motors[$('#motor_sl').val()];
        fs = data[0]; inputs[0].val(fs)
        st = data[1]; inputs[1].val(st)
        sc = data[2]; inputs[2].val(sc)
        fc = data[3]; inputs[3].val(fc)
    }

    function update() {
        console.log('update')
        slc = inputs[4].val();
        de = inputs[5].val();
        tg = inputs[6].val();
        mg = inputs[7].val();
        tw = inputs[8].val();
        wa = inputs[9].val();
        wd = inputs[10].val();
        wc = inputs[11].val();
        ig = 1; $('.driving').each((gear)=>{ig*=gear.value})
        og = 1; $('.driven').each((gear)=>{og*=gear.value})
        console.log(fs, st, sc, fc, slc, de, tg, mg, tw, wa, wc, ig, og)

        $('#dfs').text(Math.round(freeSpeed(fs, wd, ig, og)* 1000)/1000)
        $('#das').text(Math.round(freeSpeed(fs, wd, ig, og) * slc * 1000) / 1000)
        $('#cdpm').text(Math.round(currentDrawPerMotor(sc, fc, st, tw, wa, wc, tg, wd, de, mg, ig, og) * 1000) / 1000)
    }
    function freeSpeed(fs, wd, ig, og){
        return fs * wd * og / ig * (0.0254  * Math.PI / 18.348);
    }
    function currentDrawPerMotor(sc, fc, st, tw, wa, wc, tg, wd, de, mg, ig, og){
        return ((sc-fc)*tg*2*de*mg*og/st/tw/wa/wc/4.44822161526/wd/0.0254/ig) + fc
    }

})