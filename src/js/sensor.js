// web/js/sensor.js
window.addEventListener('DOMContentLoaded', () => {
    const socket = io("http://192.168.111.127:5000");   
  
    socket.on('sensor', data => {
      document.getElementById('d1').textContent = data.d1.toFixed(3);
      document.getElementById('d2').textContent = data.d2.toFixed(3);
    });
  });
  