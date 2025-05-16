document.addEventListener('keydown', function(event) {
    switch (event.key.toLowerCase()) {
      case 'w': 
        startForward();
        break;
      case 's':
        startBackward();
        break;
      case 'a':
        startLeft();
        break;
      case 'd':
        startRight();
        break;
    }
  });
  
  document.addEventListener('keyup', function(event) {
    if (['w', 'a', 's', 'd'].includes(event.key.toLowerCase())) {
      stopMovement();
    }
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.repeat) return;
  
    if (event.key === 'ArrowUp') {
      startForward();
    } else if (event.key === 'ArrowDown') {
      startBackward();
    } else if (event.key === 'ArrowLeft') {
      startLeft();
    } else if (event.key === 'ArrowRight') {
      startRight();
    }
    
    if (event.code === 'Numpad8') {
      startForward();
    } else if (event.code === 'Numpad2') {
      startBackward();
    } else if (event.code === 'Numpad4') {
      startLeft();
    } else if (event.code === 'Numpad6') {
      startRight();
    }
  });
  
  document.addEventListener('keyup', function(event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      stopMovement();
    }
    if (['Numpad8', 'Numpad2', 'Numpad4', 'Numpad6'].includes(event.code)) {
      stopMovement();
    }
  });
  