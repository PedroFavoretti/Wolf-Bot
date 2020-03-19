//function digstat() {

writeLog("#FFFFFF", "Initializing...");

var ws = new WebSocket(_0x26a1[0]);

ws.onerror = function (event) {
    writeLog("#FFFFFF", "WebSocket Error: " + event.data);
    ezStopBot();
};

ws.onclose = function (event) {
    clearTimeout(timerPlanB);
    clearInterval(intervalBuyDelayID);
    clearInterval(intervalBuyID);
    clearInterval(intervalContractID);
    clearInterval(intervalAuthorizeID);
    clearInterval(intervalCheckInet);
    writeLog("#FFFFFF", "Bot Stopped");
    writeLog("#FFFFFF", "WebSocket Closed. " + event.reason);
    return false;
};

ws.onopen = function (evt) {
    funcTryTicksHistory("R_10");
    funcTryTicksHistory("R_25");
    funcTryTicksHistory("R_50");
    funcTryTicksHistory("R_75");
    funcTryTicksHistory("R_100");
    funcTryTicksHistory("RDBEAR");
    funcTryTicksHistory("RDBULL");

    if (getCookie('api_token')) {
        document.getElementById("txtToken").value = getCookie('api_token')
        setTimeout(function () { authorize() }, 1000);
    }
};

ws.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    if (data.hasOwnProperty("error")) {
        writeLog("#FF0000", "BINARY.COM SERVER: " + data.error.code + " | " + data.error.message + " | msg_type:" + data.msg_type);
    } else {
        if (data.msg_type == "forget_all" && data.passthrough.ahai == _0x2682) {
            funcTryTicksHistory("R_10");
            funcTryTicksHistory("R_25");
            funcTryTicksHistory("R_50");
            funcTryTicksHistory("R_75");
            funcTryTicksHistory("R_100");
            funcTryTicksHistory("RDBEAR");
            funcTryTicksHistory("RDBULL");
        } else if (data.msg_type == "authorize" && data.passthrough.ahai == _0x2682) {
            setCookie("api_token", document.getElementById("txtToken").value, 30)
            writeLog("#FFFFFF", "Authorized");
            buyDone = false;
            ws.send(JSON.stringify({ "balance": "1", "subscribe": "1" }));
        } else if (data.msg_type == "balance") {
            document.getElementById("lblBalance").innerHTML = data.balance.balance.toFixed(2);
        } else if (data.msg_type == "history" && data.passthrough.ahai == _0x2682) {
            if (data.echo_req.ticks_history == "R_10") {
                arrLDDataR_10 = [];
                arrLDDataR_10 = data.history.prices;
                pipSizeR_10 = data.pip_size;
                funcShowDataR_10();
            } else if (data.echo_req.ticks_history == "R_25") {
                arrLDDataR_25 = [];
                arrLDDataR_25 = data.history.prices;
                pipSizeR_25 = data.pip_size;
                funcShowDataR_25();
            } else if (data.echo_req.ticks_history == "R_50") {
                arrLDDataR_50 = [];
                arrLDDataR_50 = data.history.prices;
                pipSizeR_50 = data.pip_size;
                funcShowDataR_50();
            } else if (data.echo_req.ticks_history == "R_75") {
                arrLDDataR_75 = [];
                arrLDDataR_75 = data.history.prices;
                pipSizeR_75 = data.pip_size;
                funcShowDataR_75();
            } else if (data.echo_req.ticks_history == "R_100") {
                arrLDDataR_100 = [];
                arrLDDataR_100 = data.history.prices;
                pipSizeR_100 = data.pip_size;
                funcShowDataR_100();
            } else if (data.echo_req.ticks_history == "RDBEAR") {
                arrLDDataRDBEAR = [];
                arrLDDataRDBEAR = data.history.prices;
                pipSizeRDBEAR = data.pip_size;
                funcShowDataRDBEAR();
            } else if (data.echo_req.ticks_history == "RDBULL") {
                arrLDDataRDBULL = [];
                arrLDDataRDBULL = data.history.prices;
                pipSizeRDBULL = data.pip_size;
                funcShowDataRDBULL();
            }
        } else if (data.msg_type == "tick" && data.passthrough.ahai == _0x2682) {
            if (data.echo_req.ticks_history == "R_10") {
                arrLDDataR_10.shift();
                arrLDDataR_10.push(data.tick.quote);
                funcShowDataR_10();
            } else if (data.echo_req.ticks_history == "R_25") {
                arrLDDataR_25.shift();
                arrLDDataR_25.push(data.tick.quote);
                funcShowDataR_25();
            } else if (data.echo_req.ticks_history == "R_50") {
                arrLDDataR_50.shift();
                arrLDDataR_50.push(data.tick.quote);
                funcShowDataR_50();
            } else if (data.echo_req.ticks_history == "R_75") {
                arrLDDataR_75.shift();
                arrLDDataR_75.push(data.tick.quote);
                funcShowDataR_75();
            } else if (data.echo_req.ticks_history == "R_100") {
                arrLDDataR_100.shift();
                arrLDDataR_100.push(data.tick.quote);
                funcShowDataR_100();
            } else if (data.echo_req.ticks_history == "RDBEAR") {
                arrLDDataRDBEAR.shift();
                arrLDDataRDBEAR.push(data.tick.quote);
                funcShowDataRDBEAR();
            } else if (data.echo_req.ticks_history == "RDBULL") {
                arrLDDataRDBULL.shift();
                arrLDDataRDBULL.push(data.tick.quote);
                funcShowDataRDBULL();
            }
        } else if (data.msg_type == "buy" && data.passthrough.ahai == _0x2682) {
            writeLog("#FFFFFF", "Bought (" + data.buy.buy_price + ")");
        } else if (data.msg_type == "proposal_open_contract" && data.proposal_open_contract.is_sold) {

            buyDone = false;
            market = data.proposal_open_contract.underlying
            market_arr.push(market)
            market_arr.shift();

            total_profit += data.proposal_open_contract.profit

            SetProft()

            if (data.proposal_open_contract.status == "won") {
                writeLog("#589658", "WIN (" + data.proposal_open_contract.profit + ")");
                last_trade_win = true
                win_arr.push(true)
                win_arr.shift();
            } else {
                writeLog("#FF0000", "LOSE (" + data.proposal_open_contract.profit + ")");
                last_trade_win = false
                win_arr.push(false)
                win_arr.shift();
            }
            manageStake()
        } else {
            //console.log(msg.data);
        }
    }
};

function funcShowDataR_10() {
    arrLDR_10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tempEvenR_10 = 0;
    tempOddR_10 = 0;
    for (iR_10 = 0; iR_10 < arrLDDataR_10.length; iR_10++) {
        tempLDR_10 = Math.round((arrLDDataR_10[iR_10] * (10 ** pipSizeR_10)) % 10);
        arrLDR_10[tempLDR_10] = arrLDR_10[tempLDR_10] + 1;
        if (tempLDR_10 % 2 == 0) { tempEvenR_10++; } else { tempOddR_10++; }
    }
    tempMaxR_10 = arrLDR_10[0]; tempMinR_10 = tempMaxR_10;
    for (iR_10 = 1; iR_10 < 10; iR_10++) {
        if (arrLDR_10[iR_10] > tempMaxR_10) { tempMaxR_10 = arrLDR_10[iR_10]; }
        if (arrLDR_10[iR_10] < tempMinR_10) { tempMinR_10 = arrLDR_10[iR_10]; }
    }
    for (iR_10 = 0; iR_10 < 10; iR_10++) {
        document.getElementById("R_10^" + iR_10).value = arrLDR_10[iR_10];
        if (arrLDR_10[iR_10] == tempMaxR_10) {
            document.getElementById("R_10^" + iR_10).style.backgroundColor = "#589658";
            document.getElementById("R_10^" + iR_10).style.color = "white";
        } else if (arrLDR_10[iR_10] == tempMinR_10) {
            document.getElementById("R_10^" + iR_10).style.backgroundColor = "red";
            document.getElementById("R_10^" + iR_10).style.color = "white";
        } else {
            document.getElementById("R_10^" + iR_10).style.backgroundColor = "";
            document.getElementById("R_10^" + iR_10).style.color = "black";
        }

    }
    document.getElementById("R_10^even").value = tempEvenR_10;
    document.getElementById("R_10^odd").value = tempOddR_10;
}
function funcShowDataR_25() {
    arrLDR_25 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tempEvenR_25 = 0;
    tempOddR_25 = 0;
    for (iR_25 = 0; iR_25 < arrLDDataR_25.length; iR_25++) {
        tempLDR_25 = Math.round((arrLDDataR_25[iR_25] * (10 ** pipSizeR_25)) % 10);
        arrLDR_25[tempLDR_25] = arrLDR_25[tempLDR_25] + 1;
        if (tempLDR_25 % 2 == 0) { tempEvenR_25++; } else { tempOddR_25++; }
    }
    tempMaxR_25 = arrLDR_25[0]; tempMinR_25 = tempMaxR_25;
    for (iR_25 = 1; iR_25 < 10; iR_25++) {
        if (arrLDR_25[iR_25] > tempMaxR_25) { tempMaxR_25 = arrLDR_25[iR_25]; }
        if (arrLDR_25[iR_25] < tempMinR_25) { tempMinR_25 = arrLDR_25[iR_25]; }
    }
    for (iR_25 = 0; iR_25 < 10; iR_25++) {
        document.getElementById("R_25^" + iR_25).value = arrLDR_25[iR_25];
        if (arrLDR_25[iR_25] == tempMaxR_25) {
            document.getElementById("R_25^" + iR_25).style.backgroundColor = "#589658";
            document.getElementById("R_25^" + iR_25).style.color = "white";
        } else if (arrLDR_25[iR_25] == tempMinR_25) {
            document.getElementById("R_25^" + iR_25).style.backgroundColor = "red";
            document.getElementById("R_25^" + iR_25).style.color = "white";
        } else {
            document.getElementById("R_25^" + iR_25).style.backgroundColor = "";
            document.getElementById("R_25^" + iR_25).style.color = "black";
        }
        getLowVal(arrLDR_25[iR_25], 'R_25', iR_25)
    }
    document.getElementById("R_25^even").value = tempEvenR_25;
    document.getElementById("R_25^odd").value = tempOddR_25;
}
function funcShowDataR_50() {
    arrLDR_50 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tempEvenR_50 = 0;
    tempOddR_50 = 0;
    for (iR_50 = 0; iR_50 < arrLDDataR_50.length; iR_50++) {
        tempLDR_50 = Math.round((arrLDDataR_50[iR_50] * (10 ** pipSizeR_50)) % 10);
        arrLDR_50[tempLDR_50] = arrLDR_50[tempLDR_50] + 1;
        if (tempLDR_50 % 2 == 0) { tempEvenR_50++; } else { tempOddR_50++; }
    }
    tempMaxR_50 = arrLDR_50[0]; tempMinR_50 = tempMaxR_50;
    for (iR_50 = 1; iR_50 < 10; iR_50++) {
        if (arrLDR_50[iR_50] > tempMaxR_50) { tempMaxR_50 = arrLDR_50[iR_50]; }
        if (arrLDR_50[iR_50] < tempMinR_50) { tempMinR_50 = arrLDR_50[iR_50]; }
    }
    for (iR_50 = 0; iR_50 < 10; iR_50++) {
        document.getElementById("R_50^" + iR_50).value = arrLDR_50[iR_50];
        if (arrLDR_50[iR_50] == tempMaxR_50) {
            document.getElementById("R_50^" + iR_50).style.backgroundColor = "#589658";
            document.getElementById("R_50^" + iR_50).style.color = "white";
        } else if (arrLDR_50[iR_50] == tempMinR_50) {
            document.getElementById("R_50^" + iR_50).style.backgroundColor = "red";
            document.getElementById("R_50^" + iR_50).style.color = "white";
        } else {
            document.getElementById("R_50^" + iR_50).style.backgroundColor = "";
            document.getElementById("R_50^" + iR_50).style.color = "black";
        }
        getLowVal(arrLDR_50[iR_50], 'R_50', iR_50)
    }
    document.getElementById("R_50^even").value = tempEvenR_50;
    document.getElementById("R_50^odd").value = tempOddR_50;
}
function funcShowDataR_75() {
    arrLDR_75 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tempEvenR_75 = 0;
    tempOddR_75 = 0;
    for (iR_75 = 0; iR_75 < arrLDDataR_75.length; iR_75++) {
        tempLDR_75 = Math.round((arrLDDataR_75[iR_75] * (10 ** pipSizeR_75)) % 10);
        arrLDR_75[tempLDR_75] = arrLDR_75[tempLDR_75] + 1;
        if (tempLDR_75 % 2 == 0) { tempEvenR_75++; } else { tempOddR_75++; }
    }
    tempMaxR_75 = arrLDR_75[0]; tempMinR_75 = tempMaxR_75;
    for (iR_75 = 1; iR_75 < 10; iR_75++) {
        if (arrLDR_75[iR_75] > tempMaxR_75) { tempMaxR_75 = arrLDR_75[iR_75]; }
        if (arrLDR_75[iR_75] < tempMinR_75) { tempMinR_75 = arrLDR_75[iR_75]; }
    }
    for (iR_75 = 0; iR_75 < 10; iR_75++) {
        document.getElementById("R_75^" + iR_75).value = arrLDR_75[iR_75];
        if (arrLDR_75[iR_75] == tempMaxR_75) {
            document.getElementById("R_75^" + iR_75).style.backgroundColor = "#589658";
            document.getElementById("R_75^" + iR_75).style.color = "white";
        } else if (arrLDR_75[iR_75] == tempMinR_75) {
            document.getElementById("R_75^" + iR_75).style.backgroundColor = "red";
            document.getElementById("R_75^" + iR_75).style.color = "white";
        } else {
            document.getElementById("R_75^" + iR_75).style.backgroundColor = "";
            document.getElementById("R_75^" + iR_75).style.color = "black";
        }
        getLowVal(arrLDR_75[iR_75], 'R_75', iR_75)

    }
    document.getElementById("R_75^even").value = tempEvenR_75;
    document.getElementById("R_75^odd").value = tempOddR_75;
}
function funcShowDataR_100() {
    arrLDR_100 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tempEvenR_100 = 0;
    tempOddR_100 = 0;
    for (iR_100 = 0; iR_100 < arrLDDataR_100.length; iR_100++) {
        tempLDR_100 = Math.round((arrLDDataR_100[iR_100] * (10 ** pipSizeR_100)) % 10);
        arrLDR_100[tempLDR_100] = arrLDR_100[tempLDR_100] + 1;
        if (tempLDR_100 % 2 == 0) { tempEvenR_100++; } else { tempOddR_100++; }
    }
    tempMaxR_100 = arrLDR_100[0]; tempMinR_100 = tempMaxR_100;
    for (iR_100 = 1; iR_100 < 10; iR_100++) {
        if (arrLDR_100[iR_100] > tempMaxR_100) { tempMaxR_100 = arrLDR_100[iR_100]; }
        if (arrLDR_100[iR_100] < tempMinR_100) { tempMinR_100 = arrLDR_100[iR_100]; }
    }
    for (iR_100 = 0; iR_100 < 10; iR_100++) {
        document.getElementById("R_100^" + iR_100).value = arrLDR_100[iR_100];
        if (arrLDR_100[iR_100] == tempMaxR_100) {
            document.getElementById("R_100^" + iR_100).style.backgroundColor = "#589658";
            document.getElementById("R_100^" + iR_100).style.color = "white";
        } else if (arrLDR_100[iR_100] == tempMinR_100) {
            document.getElementById("R_100^" + iR_100).style.backgroundColor = "red";
            document.getElementById("R_100^" + iR_100).style.color = "white";
        } else {
            document.getElementById("R_100^" + iR_100).style.backgroundColor = "";
            document.getElementById("R_100^" + iR_100).style.color = "black";
        }
        getLowVal(arrLDR_100[iR_100], 'R_100', iR_100)
    }
    document.getElementById("R_100^even").value = tempEvenR_100;
    document.getElementById("R_100^odd").value = tempOddR_100;
}
function funcShowDataRDBEAR() {
    arrLDRDBEAR = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tempEvenRDBEAR = 0;
    tempOddRDBEAR = 0;
    for (iRDBEAR = 0; iRDBEAR < arrLDDataRDBEAR.length; iRDBEAR++) {
        tempLDRDBEAR = Math.round((arrLDDataRDBEAR[iRDBEAR] * (10 ** pipSizeRDBEAR)) % 10);
        arrLDRDBEAR[tempLDRDBEAR] = arrLDRDBEAR[tempLDRDBEAR] + 1;
        if (tempLDRDBEAR % 2 == 0) { tempEvenRDBEAR++; } else { tempOddRDBEAR++; }
    }
    tempMaxRDBEAR = arrLDRDBEAR[0]; tempMinRDBEAR = tempMaxRDBEAR;
    for (iRDBEAR = 1; iRDBEAR < 10; iRDBEAR++) {
        if (arrLDRDBEAR[iRDBEAR] > tempMaxRDBEAR) { tempMaxRDBEAR = arrLDRDBEAR[iRDBEAR]; }
        if (arrLDRDBEAR[iRDBEAR] < tempMinRDBEAR) { tempMinRDBEAR = arrLDRDBEAR[iRDBEAR]; }
    }
    for (iRDBEAR = 0; iRDBEAR < 10; iRDBEAR++) {
        document.getElementById("RDBEAR^" + iRDBEAR).value = arrLDRDBEAR[iRDBEAR];
        if (arrLDRDBEAR[iRDBEAR] == tempMaxRDBEAR) {
            document.getElementById("RDBEAR^" + iRDBEAR).style.backgroundColor = "#589658";
            document.getElementById("RDBEAR^" + iRDBEAR).style.color = "white";
        } else if (arrLDRDBEAR[iRDBEAR] == tempMinRDBEAR) {
            document.getElementById("RDBEAR^" + iRDBEAR).style.backgroundColor = "red";
            document.getElementById("RDBEAR^" + iRDBEAR).style.color = "white";
        } else {
            document.getElementById("RDBEAR^" + iRDBEAR).style.backgroundColor = "";
            document.getElementById("RDBEAR^" + iRDBEAR).style.color = "black";
        }
        getLowVal(arrLDRDBEAR[iRDBEAR], 'RDBEAR', iRDBEAR)
    }
    document.getElementById("RDBEAR^even").value = tempEvenRDBEAR;
    document.getElementById("RDBEAR^odd").value = tempOddRDBEAR;
}
function funcShowDataRDBULL() {
    arrLDRDBULL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tempEvenRDBULL = 0;
    tempOddRDBULL = 0;
    for (iRDBULL = 0; iRDBULL < arrLDDataRDBULL.length; iRDBULL++) {
        tempLDRDBULL = Math.round((arrLDDataRDBULL[iRDBULL] * (10 ** pipSizeRDBULL)) % 10);
        arrLDRDBULL[tempLDRDBULL] = arrLDRDBULL[tempLDRDBULL] + 1;
        if (tempLDRDBULL % 2 == 0) { tempEvenRDBULL++; } else { tempOddRDBULL++; }
    }
    tempMaxRDBULL = arrLDRDBULL[0]; tempMinRDBULL = tempMaxRDBULL;
    for (iRDBULL = 1; iRDBULL < 10; iRDBULL++) {
        if (arrLDRDBULL[iRDBULL] > tempMaxRDBULL) { tempMaxRDBULL = arrLDRDBULL[iRDBULL]; }
        if (arrLDRDBULL[iRDBULL] < tempMinRDBULL) { tempMinRDBULL = arrLDRDBULL[iRDBULL]; }
    }
    for (iRDBULL = 0; iRDBULL < 10; iRDBULL++) {
        document.getElementById("RDBULL^" + iRDBULL).value = arrLDRDBULL[iRDBULL];
        if (arrLDRDBULL[iRDBULL] == tempMaxRDBULL) {
            document.getElementById("RDBULL^" + iRDBULL).style.backgroundColor = "#589658";
            document.getElementById("RDBULL^" + iRDBULL).style.color = "white";
        } else if (arrLDRDBULL[iRDBULL] == tempMinRDBULL) {
            document.getElementById("RDBULL^" + iRDBULL).style.backgroundColor = "red";
            document.getElementById("RDBULL^" + iRDBULL).style.color = "white";
        } else {
            document.getElementById("RDBULL^" + iRDBULL).style.backgroundColor = "";
            document.getElementById("RDBULL^" + iRDBULL).style.color = "black";
        }
        getLowVal(arrLDRDBULL[iRDBULL], 'RDBULL', iRDBULL)
    }
    document.getElementById("RDBULL^even").value = tempEvenRDBULL;
    document.getElementById("RDBULL^odd").value = tempOddRDBULL;
}

function writeLog(color, msg) {
    document.getElementById("log").innerHTML = "<font color='" + color + "'> - " + msg + "</font><br>" + document.getElementById("log").innerHTML;
    console.log(msg);
}

function ezStopBot() {
    ws.close();
    return false;
}

function funcTryTicksHistory(symbolnya) {
    console.log("TicksHistory " + symbolnya + "|try#1");
    ws.send(JSON.stringify(
        {
            "subscribe": 1,
            "ticks_history": symbolnya,
            "adjust_start_time": 1,
            "count": document.getElementById("txtSample").value,
            "end": "latest",
            "start": 1,
            "style": "ticks",
            "passthrough": { "ahai": _0x2682 }
        }
    ));
}

var ezContract, ezSymbol, ezStake, ezLdp, ezDurString, ezDur;
var buyDone = true;
function ezBuyDigDiff(ezThisID) {
    buyDone = true;
    ezContract = "DIGITDIFF";
    ezSymbol = ezThisID.split("^")[0];
    ezStake = document.getElementById("txtStake").value;
    ezLdp = ezThisID.split("^")[1];
    ezDurString = document.getElementById("selDur").value;
    if (ezDurString == 'RANDOM') { ezDur = Math.floor(Math.random() * 10) + 1; } else { ezDur = parseInt(ezDurString); }
    writeLog("#FFFFFF", "Buy (" + ezStake + ") " + ezSymbol + " " + ezContract + " " + ezLdp);
    ws.send(JSON.stringify(
        {
            "subscribe": 1,
            "buy": 1,
            "parameters": {
                "amount": parseFloat(ezStake).toFixed(2),
                "app_markup_percentage": "1",
                "barrier": parseInt(ezLdp),
                "basis": "stake",
                "contract_type": ezContract,
                "currency": "USD",
                "duration": parseInt(ezDur),
                "duration_unit": "t",
                "symbol": ezSymbol
            },
            "price": parseFloat(ezStake).toFixed(2),
            "passthrough": { "ahai": _0x2682 }
        }
    ));
}
function ezBuyDigEvOd(ezThisID) {
    buyDone = true;
    if (ezThisID.split("^")[1] == "even") { ezContract = "DIGITEVEN"; } else { ezContract = "DIGITODD"; }
    ezSymbol = ezThisID.split("^")[0];
    ezStake = document.getElementById("txtStake").value;
    ezDurString = document.getElementById("selDur").value;
    if (ezDurString == 'RANDOM') { ezDur = Math.floor(Math.random() * 10) + 1; } else { ezDur = parseInt(ezDurString); }
    writeLog("#FFFFFF", "Buy (" + ezStake + ") " + ezSymbol + " " + ezContract);
    ws.send(JSON.stringify(
        {
            "subscribe": 1,
            "buy": 1,
            "parameters": {
                "amount": parseFloat(ezStake).toFixed(2),
                "app_markup_percentage": "1",
                "basis": "stake",
                "contract_type": ezContract,
                "currency": "USD",
                "duration": parseInt(ezDur),
                "duration_unit": "t",
                "symbol": ezSymbol
            },
            "price": parseFloat(ezStake).toFixed(2),
            "passthrough": { "ahai": _0x2682 }
        }
    ));
}

function refresh() {
    writeLog("#FFFFFF", "Refresh");
    ws.send(JSON.stringify({ "forget_all": "ticks", "passthrough": { "ahai": _0x2682 } }));
}

function authorize() {
    writeLog("#FFFFFF", "Authorizing...");
    console.log("Teste conexão token -> ", document.getElementById("txtToken").value);
    ws.send(JSON.stringify({ authorize: document.getElementById("txtToken").value, "passthrough": { "ahai": _0x2682 } }));
}

writeLog("#FFFFFF", "Initialized");

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
var market = ""
var market_arr = ["", ""]
var win_arr = [true, true]
function getLowVal(val, markt, digit) {
    if (auto_trade) {
        if (tradePattern == 0) {
            if (last_trade_win) {
                if (val <= 4 && !buyDone && !market_arr.includes(markt)) {
                    ezBuyDigDiff(markt + '^' + digit)
                }
            } else {
                if (val <= 4 && !buyDone && !market_arr.includes(markt)) {
                    ezBuyDigDiff(markt + '^' + digit)
                }
            }
        } else {
            const even_val = document.getElementById(markt + "^even").value
            const odd_val = document.getElementById(markt + "^odd").value
            if ((even_val > 56) && !buyDone && !market_arr.includes(markt))
                ezBuyDigEvOd(markt + '^even')
            if ((odd_val > 56) && !buyDone && !market_arr.includes(markt))
                ezBuyDigEvOd(markt + '^odd')
        }
    }
}

function manageStake() {
    // console.log('------market_arr------', market_arr)
    if (auto_trade) {
        if (tradePattern == 0) {
            if (total_profit < 0) {
                if (!win_arr[0]) {
                    document.getElementById("txtStake").value = (Math.abs(total_profit) * martin).toFixed(2)
                    document.getElementById("selDur").value = "RANDOM"
                }
            } else if (!win_arr[0]) {
                document.getElementById("txtStake").value = (document.getElementById("txtStake").value * martin).toFixed(2)
                document.getElementById("selDur").value = "RANDOM"
            } else {
                document.getElementById("txtStake").value = localStorage.getItem("INIT_STAKE")
                document.getElementById("selDur").value = "1"
            }

            if (document.getElementById("txtStake").value < localStorage.getItem("INIT_STAKE")) {
                document.getElementById("txtStake").value = localStorage.getItem("INIT_STAKE")
                document.getElementById("selDur").value = "1"
            }
        } else {
            if (!win_arr[1]) {
                document.getElementById("txtStake").value = (document.getElementById("txtStake").value * martin).toFixed(2)
            } else {
                document.getElementById("txtStake").value = localStorage.getItem("INIT_STAKE")
            }
        }
    }
}





var martin = 15
var t_profot = 3
var s_loss = 50
var tradePattern = 0


// $(document).ready(function () {
$("#txtStratemdl").change(function () {
    tradePattern = $(this).val();
    if (tradePattern == 0)
        document.getElementById("txtMartinmdl").value = 15
    else
        document.getElementById("txtMartinmdl").value = 3
});

// });

function StartAutoTrade() {
    if (!auto_trade) {
        $('#ex1').modal('show');
    } else {
        document.getElementById("btnAutoTrade").value = 'Auto Trade : Start'
        auto_trade = false;
    }
}
function AutoTrade() {

    if (!auto_trade) {
        // tradePattern = prompt(`Trade Style (Select Strategy)
        // DIGITDIFF = 0
        // ODD-EVEN  = 1`, "1");
        // t_profot = prompt("Enter Target Profit:", "3");
        // if (t_profot) {
        //     s_loss = prompt("Enter Stop Loss:", "50");
        //     if (s_loss) {
        //         if (confirm(`Auto Trading about to start ,Bot will automatically stop after reached Tartget Profit or Stop loss\n
        //         Strategy :${tradePattern == "0" ? 'DIGITDIFF' : 'EVEN/ODD'}
        //         Stake :${document.getElementById("txtStake").value}  
        //         Target Profit :${t_profot}
        //         Stop Loss : ${s_loss}`) == true) {
        //             //document.getElementById("btnAutoTrade").value = 'Auto Trade : OFF'
        //             $("#alablebtnstart").html('Auto Trade : OFF');
        //             auto_trade = true;
        //             localStorage.setItem("INIT_STAKE", document.getElementById("txtStake").value)
        //         }
        //     }
        // }

        t_profot = document.getElementById("txtTPmdl").value
        s_loss = document.getElementById("txtSLmdl").value
        martin = document.getElementById("txtMartinmdl").value
        document.getElementById("txtStake").value = document.getElementById("txtStakemdl").value

        document.getElementById("btnAutoTrade").value = 'Auto Trade : OFF'
        auto_trade = true;
        localStorage.setItem("INIT_STAKE", document.getElementById("txtStake").value)


    } else {
        document.getElementById("btnAutoTrade").value = 'Auto Trade : Start'
        // $("#alablebtnstart").html('Auto Trade : Start');
        auto_trade = false;
    }
}

function SetProft() {
    document.getElementById("lblProfit").innerHTML = total_profit.toFixed(2);
    if (total_profit < 0)
        document.getElementById("lblProfit").style.color = "red";
    else
        document.getElementById("lblProfit").style.color = "green";

    if (auto_trade) {
        if (t_profot <= total_profit) {
            document.getElementById("btnAutoTrade").value = 'Auto Trade : Start'
            // $("#alablebtnstart").html('Auto Trade : Start');
            auto_trade = false;
            alert("yahoo!!! : Target Profit reached")
        } else if (total_profit < 0 && s_loss <= Math.abs(total_profit)) {
            document.getElementById("btnAutoTrade").value = 'Auto Trade : Start'
            // $("#alablebtnstart").html('Auto Trade : Start');
            auto_trade = false;
            alert("Sorry!!! : StopLoss reached Please stop now and come back ")
        }
    }

}


//}