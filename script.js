
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    document.getElementById('clock').textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();


function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    if (menu.style.display === 'none') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
}


document.addEventListener('click', function(e) {
    const menu = document.getElementById('start-menu');
    const startBtn = document.querySelector('.start-button');
    if (!menu.contains(e.target) && !startBtn.contains(e.target)) {
        menu.style.display = 'none';
    }
});


function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'block';
    bringToFront(win);
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

const windows = document.querySelectorAll('.window');
windows.forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win));
});

function bringToFront(element) {
    windows.forEach(w => w.style.zIndex = 10);
    element.style.zIndex = 20;
}


document.querySelectorAll('.window').forEach(win => {
    const titleBar = win.querySelector('.title-bar');
    
    titleBar.addEventListener('mousedown', function(e) {
        let shiftX = e.clientX - win.getBoundingClientRect().left;
        let shiftY = e.clientY - win.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            win.style.left = pageX - shiftX + 'px';
            win.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        titleBar.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            titleBar.onmouseup = null;
        };
    });

    titleBar.ondragstart = function() {
        return false;
    };
});