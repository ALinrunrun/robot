// Function to send a command to the Raspberry Pi via HTTP POST
function sendCommand(command) {
  console.log("Button command:", command);
  fetch('http://192.168.111.127:5000/command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' 
    },
    body: 'cmd=' + encodeURIComponent(command)
  })
  .then(response => response.text())
  .then(data => {
    console.log("Response from Pi:", data);
  })
  .catch(error => {
    console.error("Error sending command:", error);
  });
}

let forwardInterval, backwardInterval, leftInterval, rightInterval;

function startForward() {
  if (forwardInterval) return;
  sendCommand('forward');
  forwardInterval = setInterval(() => {
    sendCommand('forward');
  }, 100); 
}

function startBackward() {
  if (backwardInterval) return;
  sendCommand('backward');
  backwardInterval = setInterval(() => {
    sendCommand('backward');
  }, 100);
}

function startLeft() {
  if (leftInterval) return;
  sendCommand('left');
  leftInterval = setInterval(() => {
    sendCommand('left');
  }, 100);
}

function startRight() {
  if (rightInterval) return;
  sendCommand('right');
  rightInterval = setInterval(() => {
    sendCommand('right');
  }, 100);
}

function stopMovement() {
  if (forwardInterval) {
    clearInterval(forwardInterval);
    forwardInterval = null;
  }
  if (backwardInterval) {
    clearInterval(backwardInterval);
    backwardInterval = null;
  }
  if (leftInterval) {
    clearInterval(leftInterval);
    leftInterval = null;
  }
  if (rightInterval) {
    clearInterval(rightInterval);
    rightInterval = null;
  }
  sendCommand('stop');
}