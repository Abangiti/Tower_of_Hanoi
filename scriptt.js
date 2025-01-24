const canvas = document.getElementById('hanoiCanvas');
const ctx = canvas.getContext('2d');


const width = canvas.width;
const height = canvas.height;


const towerWidth = 10;
const towerHeight = 200;
const towerGap = 150;
const baseHeight = 20;


const numDisks = 3;
const diskHeight = 20;
const diskColors = ['#FF5733', '#FFBD33', '#75FF33', '#33FF57', '#33FFF0'];


const diskLetters = ['ሀ', 'ለ', 'ሐ', 'መ', 'ሠ'];


const towers = [
    { x: width / 4, y: height - baseHeight, disks: [] },
    { x: width / 2, y: height - baseHeight, disks: [] },
    { x: (3 * width) / 4, y: height - baseHeight, disks: [] },
];

function initializeGame() {
    towers.forEach((tower) => (tower.disks = []));
    for (let i = numDisks; i > 0; i--) {
        towers[0].disks.push(i);
    }
    draw();
    document.getElementById('winMessage').textContent = '';
}


function drawTower(tower) {
    ctx.fillStyle = '#000';
    ctx.fillRect(
        tower.x - towerWidth / 2,
        tower.y - towerHeight,
        towerWidth,
        towerHeight
    );

   
    ctx.fillRect(
        tower.x - towerGap / 2,
        tower.y,
        towerGap,
        baseHeight
    );
}


function drawDisk(tower, diskSize, position) {
    const diskWidth = diskSize * 20;
    const x = tower.x - diskWidth / 2;
    const y = tower.y - position * diskHeight - baseHeight;
    ctx.fillStyle = diskColors[diskSize - 1];
    ctx.fillRect(x, y, diskWidth, diskHeight);

  
    ctx.fillStyle = '#fff';  
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(diskLetters[diskSize - 1], x + diskWidth / 2, y + diskHeight / 2);
}


function draw() {
    ctx.clearRect(0, 0, width, height);

    towers.forEach((tower, towerIndex) => {
        drawTower(tower);

    
        tower.disks.forEach((diskSize, index) => {
            drawDisk(tower, diskSize, index + 1);
        });
    });
}


function moveDisk(from, to) {
    if (
        towers[from].disks.length > 0 &&
        (towers[to].disks.length === 0 ||
            towers[to].disks[towers[to].disks.length - 1] >
                towers[from].disks[towers[from].disks.length - 1])
    ) {
        const disk = towers[from].disks.pop();
        towers[to].disks.push(disk);
        draw();
        checkWin();
    } else {
        document.getElementById('winMessage').textContent = 'የተሳሳተ እንቅስቃሴ!';  
    }
}


function checkWin() {
    if (towers[2].disks.length === numDisks) {
        document.getElementById('winMessage').textContent = 'አሸንፈዋል!';  
    }
}


let selectedTower = null;
canvas.addEventListener('click', (e) => {
    const x = e.offsetX;

    const clickedTower = towers.findIndex(
        (tower) => Math.abs(tower.x - x) < towerGap / 2
    );

    if (selectedTower === null) {
        selectedTower = clickedTower;
    } else {
        moveDisk(selectedTower, clickedTower);
        selectedTower = null;
    }
});


document.getElementById('restartButton').addEventListener('click', initializeGame);


initializeGame();
