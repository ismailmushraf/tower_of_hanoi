let towerColors = ["#F57D00", "#9c27b0", "#7e57c2", "#c2185b", "#4a148c", "#64b5f6", "#f50057", "#8c9eff", "#ff8a80", "#ef5350"];
let ringColors = ["#C71585", "#9932CC", "#DC143C", "#FFA500","#FFD700", "#32CD32", "#20B2AA", "#000080", "#D2B48C", "#7FFFD4",];

let ringDisp = document.getElementById("ringDisp");
let towerDisp = document.getElementById("towerDisp");
let lengthOfRing = 45;
let towerList = document.getElementById("towerList");

function setDefaultState() {
    ringDisp.innerText = 8;
    towerDisp.innerText = 3;
    setState();
}

function setState() {
    let noOfRings = parseInt(ringDisp.innerText);
    let noOfTowers = parseInt(towerDisp.innerText);
    
    towerList.innerHTML = "";
    for (var i=0; i<noOfTowers; i++) {
        var li = document.createElement("li");
        var div = document.createElement("div");
        div.setAttribute("id", i+1);
        div.setAttribute("class", "tower");
        div.style.background = towerColors[i];
        li.appendChild(div);
        towerList.appendChild(li);
    }
    let firstRing = document.getElementById("1");
    let bottomPadding = 3;
    for (var i=0; i<noOfRings; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "ring");
        div.style.width = Math.floor(lengthOfRing / noOfTowers) - ((i)/10 * Math.floor(lengthOfRing / noOfTowers)) + "vw";
        div.style.background = ringColors[i];
        div.style.bottom = bottomPadding + "vh"; 
        div.style.left = -6.25 + (((i)/10 * Math.floor(lengthOfRing / noOfTowers))/2) + "vw";
        bottomPadding += 2.5;
        firstRing.appendChild(div);
    }
}

function add(val) {
    let temp = 0;
    if (val) {
        temp = parseInt(ringDisp.innerText);
        if (temp >= 3 && temp < 8)
            ringDisp.innerText = temp + 1;
    } else {
        temp = parseInt(towerDisp.innerText);
        if (temp >= 3 && temp < 3)
            towerDisp.innerText = temp + 1;
    }
}

function subtract(val) {
    let temp = 0;
    if (val) {
        temp = parseInt(ringDisp.innerText);
        if (temp > 3 && temp <= 8)
            ringDisp.innerText = temp - 1;
    } else {
        temp = parseInt(towerDisp.innerText);
        if (temp > 3 && temp <= 3)
            towerDisp.innerText = temp - 1;
    }
}

setDefaultState()



