# robot_deco3801_deco7381
[“LexiBot” – LLM-Powered Interactive Robot]
This project focuses on developing a mobile robot platform powered by a Large Language Model (LLM), integrating Arduino and Raspberry Pi technologies to enable natural language-driven human-robot interaction. Equipped with an onboard camera for real-time visual feedback, the robot will allow users to issue commands through voice or text, creating a seamless interactive experience.

By combining LLM-based natural language processing, real-time computer vision, and interactive robotics, the system will enable users to engage conversationally, directing movements and actions with ease. This project explores the potential for voice-controlled robotics in home automation, assistive technology, and AI-driven remote operation.

# Repository layout
.
├── web/                 # HTML/CSS/JS front-end
│   └── src/
├── pi/                  # Raspberry Pi Python back-end
│   ├── movement1.py
│   └── server.py
│   └── camerastream.py
└── README.md

# Prerequisites
1. Node.js  install: https://nodejs.org/
2. Python   install: sudo apt install python3
3. Raspberry Pi OS (64bit) install: https://raspberrypi.com

## Data & hardware
Main board : Raspberry Pi 4B 8 GB  
Key components  
- Raspberry Pi 4B + Fan & Heat‑sink  
- RPi Camera v3, ultrasonic & line‑tracking sensors  
- Dual H‑bridge motor driver, chassis, speaker, 8×AA battery pack

# Build

### Raspberry Pi Control Server (`pi/server.py`)

> Live MJPEG video + REST / Socket.IO robot control
| Requirement | Version tested | Install command |
|-------------|----------------|-----------------|
| Raspberry Pi OS | bookworm 64-bit | `sudo apt update && sudo apt full-upgrade` |
| Python | 3.11 | pre-installed |
| System packages | libcamera, v4l2, pigpio | `sudo apt install libcamera-apps` |
| Python libs | picamera2, simplejpeg, gpiozero, evdev, Flask, Flask-SocketIO, Flask-CORS | `pip install picamera2 simplejpeg gpiozero evdev flask flask_socketio flask_cors` |

> **Enable camera**: `sudo raspi-config` → *Interface Options* → *Camera* → *Yes* (reboot).

#### Wiring (BCM numbering)

| Component | Pins | Notes |
|-----------|------|-------|
| **Camera** | CSI ribbon | libcamera |
| **Ultrasonic #1** | Echo 19, Trig 13 | Front-left obstacle |
| **Ultrasonic #2** | Echo 20, Trig 16 | Front-right obstacle |
| **Right motor** | FWD 17, BWD 22 | via dual H-bridge |
| **Left motor** | FWD 24, BWD 23 | "" |
| Power | 5 V / 3 A | separate supply recommended |

## Web Front-End (`src/`)

The front-end provides a control panel for interacting with the LexiBot robot. It includes real-time video streaming, voice commands, and manual control options.

### File Structure
- **HTML**: [src/index.html](src/index.html)  
  The main entry point for the web interface.
- **CSS**: [src/css/styles.css](src/css/styles.css)  
  Defines the layout and styling of the control panel.
- **JavaScript**:  
  - [src/js/keyboard.js](src/js/keyboard.js): Handles keyboard-based robot control.  
  - [src/js/send.js](src/js/send.js): Sends commands to the robot server via Socket.IO.  
  - [src/js/sensor.js](src/js/sensor.js): Processes sensor data from the robot.  
  - [src/js/voice_input.js](src/js/voice_input.js): Enables voice recognition for issuing commands.

### Features
1. **Live Video Stream**  
   Displays a real-time MJPEG video feed from the robot's camera.  
   - Source: `<img id="video-stream" src="http://<robot-ip>:8000/stream.mjpg" alt="Live video">`

2. **Voice Control**  
   Allows users to issue commands via voice input.  
   - Start/Stop buttons are implemented in [src/index.html](src/index.html).  
   - Logic is handled in [src/js/voice_input.js](src/js/voice_input.js).

3. **Manual Controls**  
   - Directional buttons for forward, backward, left, and right movement.  
   - Touch and mouse events are supported.  
   - Implemented in [src/index.html](src/index.html) and [src/js/keyboard.js](src/js/keyboard.js).

4. **Sensor Data**  
   Displays real-time sensor readings from the robot.  
   - Logic is implemented in [src/js/sensor.js](src/js/sensor.js).

### How to Run
1. Open [src/index.html](src/index.html) in a browser.
2. Ensure the robot server is running and accessible at the configured IP address.
3. Use the control panel to interact with the robot:
   - View the live video feed.
   - Issue commands via voice or manual controls.
   - Monitor sensor data in real-time.

### Dependencies
- **Socket.IO**: Used for real-time communication between the front-end and the robot server.  
  - Included via CDN: `<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>`