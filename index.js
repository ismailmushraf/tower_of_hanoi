let towerColors = ["#F57D00", "#9c27b0", "#7e57c2", "#c2185b", "#4a148c", "#64b5f6", "#f50057", "#8c9eff", "#ff8a80", "#ef5350"];
let ringColors = ["#C71585", "#9932CC", "#DC143C", "#FFA500","#FFD700", "#32CD32", "#20B2AA", "#000080", "#D2B48C", "#7FFFD4",];

let ringDisp = document.getElementById("ringDisp");
let towerDisp = document.getElementById("towerDisp");
let lengthOfRing = 45;
let towerList = document.getElementById("towerList");
let towers = {};
let isRingSelected = false;
var selectedTower;
let noOfRings;
let noOfTowers;
    

function setDefaultState() {
    ringDisp.innerText = 8;
    towerDisp.innerText = 3;
    setState();
}

function setState() {
    noOfRings = parseInt(ringDisp.innerText);
    noOfTowers = parseInt(towerDisp.innerText);
    
    towerList.innerHTML = "";
    for (var i=0; i<noOfTowers; i++) {
        var li = document.createElement("li");
        var div = document.createElement("div");
        div.setAttribute("id", i+1);
        div.setAttribute("class", "tower");
        div.setAttribute("onclick", "moveOn(this.id)");
        div.style.background = towerColors[i];
        li.appendChild(div);
        towerList.appendChild(li);
        towers[i+1] = [];
    }
    let bottomPadding = 3;
    for (var i=0; i<noOfRings; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "ring");
        div.style.width = Math.floor(lengthOfRing / noOfTowers) - ((i)/10 * Math.floor(lengthOfRing / noOfTowers)) + "vw";
        div.style.background = ringColors[i];
        div.style.bottom = bottomPadding + "vh"; 
        div.style.left = -6.25 + (((i)/10 * Math.floor(lengthOfRing / noOfTowers))/2) + "vw";
        bottomPadding += 2.5;
        towers[1].push(div);
    }
    renderTowers();
}

function renderTowers() {
    for (var i=1; i<=noOfTowers; i++) {
        let towerTemp = document.getElementById(i);
        for (var j=0; j<towers[i].length; j++) {
            towerTemp.appendChild(towers[i][j]);
        }
    }
}

function setSelectedColors(selectedTower) {
    let selectedRing = towers[selectedTower][towers[selectedTower].length-1];
    selectedRing.style.border = "3px solid skyblue";
    for (var i=1; i<=noOfTowers; i++) {
       if (towers[i].length == 0 || parseInt(towers[selectedTower][towers[selectedTower].length-1].style.width) < parseInt(towers[i][towers[i].length-1].style.width)) {
            document.getElementById(i).style.border = "3px solid skyblue";
            document.getElementById(i).style.borderBottom = "none";
        }
    }
}

function unselectAll() {
    for (var i=0; i<noOfTowers; i++) {
        document.getElementById(i+1).style.border = "none";
    }
    for (var i=1; i<=noOfTowers; i++) {
        if (towers[i].length != 0)
            towers[i][towers[i].length-1].style.border = "none";
    }
}

function moveOn(towerId) {
    if (isRingSelected) {
        if (towers[towerId].length == 0 || parseInt(towers[selectedTower][towers[selectedTower].length-1].style.width) < parseInt(towers[towerId][towers[towerId].length-1].style.width)) {
            towers[towerId].push(towers[selectedTower].pop());
            isRingSelected = false;
            unselectAll();
            renderTowers();
        } else {
            isRingSelected = false;
            unselectAll();
        }
    } else {
        if (towers[towerId].length > 0) {
            isRingSelected = true;
            selectedTower = towerId;
            setSelectedColors(selectedTower);
        }
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



