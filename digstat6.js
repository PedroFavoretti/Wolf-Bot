//function digstat() {

writeLog("#FFFFFF", "Initializing...");

var ws6 = new WebSocket(_0x26a1[0]);

function ezStopBot() {
    ws6.close();
    return false;
}

var ezContract6, ezSymbol6, ezStake6, ezLdp6, ezDur6String6, ezDur6;
var buyDone2 = true;
function ezBuyDigDiff6(ezThisID) {
    buyDone2 = true;
    ezContract6 = "DIGITDIFF";
    ezSymbol6 = ezThisID.split("^")[0];
    ezStake6 = document.getElementById("txtStake").value;
    ezLdp6 = ezThisID.split("^")[1];
    ezDur6String6 = document.getElementById("selDur").value;
    if (ezDur6String6 == 'RANDOM') { ezDur6 = Math.floor(Math.random() * 10) + 1; } else { ezDur6 = parseInt(ezDur6String6); }
    writeLog("#FFFFFF", "Buy (" + ezStake6 + ") " + ezSymbol6 + " " + ezContract6 + " " + ezLdp6);
    ws6.send(JSON.stringify(
        {
            "subscribe": 1,
            "buy": 1,
            "parameters": {
                "amount": parseFloat(ezStake6).toFixed(2),
                "app_markup_percentage": "1",
                "barrier": parseInt(ezLdp6),
                "basis": "stake",
                "contract_type": ezContract6,
                "currency": "USD",
                "duration": parseInt(ezDur6),
                "duration_unit": "t",
                "symbol": ezSymbol6
            },
            "price": parseFloat(ezStake6).toFixed(2),
            "passthrough": { "ahai": _0x2682 }
        }
    ));
}
function ezBuyDigEvOd(ezThisID) {
    buyDone2 = true;
    if (ezThisID.split("^")[1] == "even") { ezContract6 = "DIGITEVEN"; } else { ezContract6 = "DIGITODD"; }
    ezSymbol6 = ezThisID.split("^")[0];
    ezStake6 = document.getElementById("txtStake").value;
    ezDur6String6 = document.getElementById("selDur").value;
    if (ezDur6String6 == 'RANDOM') { ezDur6 = Math.floor(Math.random() * 10) + 1; } else { ezDur6 = parseInt(ezDur6String6); }
    writeLog("#FFFFFF", "Buy (" + ezStake6 + ") " + ezSymbol6 + " " + ezContract6);
    ws6.send(JSON.stringify(
        {
            "subscribe": 1,
            "buy": 1,
            "parameters": {
                "amount": parseFloat(ezStake6).toFixed(2),
                "app_markup_percentage": "1",
                "basis": "stake",
                "contract_type": ezContract6,
                "currency": "USD",
                "duration": parseInt(ezDur6),
                "duration_unit": "t",
                "symbol": ezSymbol6
            },
            "price": parseFloat(ezStake6).toFixed(2),
            "passthrough": { "ahai": _0x2682 }
        }
    ));
}

function refresh() {
    writeLog("#FFFFFF", "Refresh");
    ws6.send(JSON.stringify({ "forget_all": "ticks", "passthrough": { "ahai": _0x2682 } }));
}

function authorize6() {
    writeLog("#FFFFFF", "Authorizing...");
    ws6.send(JSON.stringify({ authorize: document.getElementById("txtToken6").value, "passthrough": { "ahai": _0x2682 } }));
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
                if (val <= 4 && !buyDone2 && !market_arr.includes(markt)) {
                    ezBuyDigDiff6(markt + '^' + digit)
                }
            } else {
                if (val <= 4 && !buyDone2 && !market_arr.includes(markt)) {
                    ezBuyDigDiff6(markt + '^' + digit)
                }
            }
        } else {
            const even_val = document.getElementById(markt + "^even").value
            const odd_val = document.getElementById(markt + "^odd").value
            if ((even_val > 56) && !buyDone2 && !market_arr.includes(markt))
                ezBuyDigEvOd(markt + '^even')
            if ((odd_val > 56) && !buyDone2 && !market_arr.includes(markt))
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