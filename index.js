const ringColors = ["#C71585", "#9932CC", "#DC143C", "#FFA500","#FFD700", "#32CD32", "#20B2AA", "#000080"];

const ringDisp = document.getElementById("ringDisp");
const noOfTowers = 3;
let noOfRings = ringDisp.innerText;
const towerBaseBottom = 46; // in pixels
const widthOfLongDisk = 95; // in pixels
let towerDivs = document.getElementsByClassName("tower");
let towers = {};

function initializeTowers() {
    towers = {
        1: [towerDivs[0]],
        2: [towerDivs[1]],
        3: [towerDivs[2]]
    };
}

function drag(ev) {
    ev.dataTransfer.setData("towerNo", ev.target.attributes.towerno.value);    
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    let currentTower = ev.dataTransfer.getData("towerno");
    let targetTower = ev.target.id;
    if (!targetTower) {
        targetTower = ev.target.attributes.towerno.value;
    }
    let currentTowerLength = towers[currentTower].length;
    let targetTowerLength = towers[targetTower].length;

    if (towers[targetTower].length == 1 || towers[currentTower][currentTowerLength - 1].style.width < towers[targetTower][targetTowerLength - 1].style.width) {
        towers[targetTower].push(towers[currentTower].pop());
    }
    renderTowersObject();
}

function setState() {
    initializeTowers();
    noOfRings = ringDisp.innerText;
    for (let i=1; i<=noOfRings; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "ring");
        div.style.background = ringColors[i-1];
        div.style.width = widthOfLongDisk - (8 * (i-1)) + "px"; 
        towers["1"].push(div);
    }
    renderTowersObject();
}

function renderTowersObject() {
    for (let i=1; i<=3; i++) {
        const tower = document.getElementById(i);
        tower.innerHTML = "";
        tower.appendChild(towers[i][0]);
        for (let j=1; j<=(towers[i].length-1)&&towers[i].length>1; j++) {
            towers[i][j].style.bottom = towerBaseBottom + ((j-1) * 15) + "px"; 
            towers[i][j].setAttribute("draggable", "true");
            towers[i][j].setAttribute("draggable", "false");
            if (j == towers[i].length - 1) {
                towers[i][j].setAttribute("ondragstart", "drag(event)");
                towers[i][j].setAttribute("draggable", "true");
                towers[i][j].setAttribute("towerno", i);
            }
            tower.appendChild(towers[i][j]);
        }
    }
}

function add() {
    let temp = 0;
    temp = parseInt(ringDisp.innerText);
    if (temp >= 3 && temp < 8) {
        ringDisp.innerText = temp + 1;
    }
    setState();
}

function subtract() {
    let temp = 0;
    temp = parseInt(ringDisp.innerText);
    if (temp > 3 && temp <= 8) {
        ringDisp.innerText = temp - 1;
    }
    setState();
}

setState()
