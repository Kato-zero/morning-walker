let map, polyline;


startBtn.disabled = true;
stopBtn.disabled = false;
}


function stopWalk() {
navigator.geolocation.clearWatch(watchId);


const endTime = new Date();
const distance = google.maps.geometry.spherical.computeLength(
path.map(p => new google.maps.LatLng(p.lat, p.lng))
) / 1000;


const duration = Math.round((endTime - startTime) / 60000);


saveWalk(distance, duration, startTime, endTime);


document.getElementById('distance').textContent = distance.toFixed(2);
document.getElementById('duration').textContent = duration + ' minutes';


document.getElementById('summary').hidden = false;
stopBtn.disabled = true;
startBtn.disabled = false;
}


function saveWalk(distance, duration, start, end) {
const walks = JSON.parse(localStorage.getItem('walks') || '[]');
walks.push({ date: new Date().toDateString(), distance, duration });
localStorage.setItem('walks', JSON.stringify(walks));
}


function showHistory() {
document.getElementById('history').hidden = false;
}


function filterHistory(type) {
const list = document.getElementById('historyList');
list.innerHTML = '';


const walks = JSON.parse(localStorage.getItem('walks') || '[]');
const today = new Date().toDateString();
const yesterday = new Date(Date.now() - 86400000).toDateString();


walks
.filter(w => type === 'today' ? w.date === today : w.date === yesterday)
.forEach(w => {
const div = document.createElement('div');
div.className = 'card';
div.innerHTML = `<strong>${w.distance.toFixed(2)} km</strong><br>${w.duration} minutes`;
list.appendChild(div);
});
}


startBtn.onclick = startWalk;
stopBtn.onclick = stopWalk;
