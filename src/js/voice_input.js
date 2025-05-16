// Close window
  function blockSleep(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      // spin...
    }
  }
  
  // Sending the contents of a voice input
  function sendVoiceCommand(inputText) {
  if (inputText.trim() !== "") {
      sendToLLM(inputText); // Call an existing sendCommand to send a command.
  } else {
      alert("Please enter or say the command!");
  }
  }
  
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  
  recognition.onstart = function () {
    document.getElementById("voice-loading").style.display = "block";
  };
  
  recognition.onresult = function (event) {
    let transcript = event.results[0][0].transcript;
    sendVoiceCommand(transcript);
    startVoiceRecognition();
  };
  
  // speech recognition error
  recognition.onerror = function (event) {
    alert("Please retry, an error occurred: " + event.error);
    startVoiceRecognition();
    //document.getElementById("voice-loading").style.display = "none";
  };
  
  // Activate speech recognition
  function startVoiceRecognition() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      console.log('Microphone access granted');
      recognition.start();
    })
    .catch(function(err) {
      console.error('Microphone access denied or error occurred:', err);
    });
  
  }
  
  function stopVoiceRecognition() {
    recognition.stop();
    document.getElementById("voice-loading").style.display = "none";
  }
  
  function AiOutput(input) {
    // Remove square brackets and trim whitespace
    const trimmed = input
    .trim()                          // remove space/newline at ends
    .replace(/^\[|\]$/g, '')        // strip [ at start or ] at end
    .replace(/\s+/g, '');           // remove _all_ whitespace (spaces, newlines, tabs…)
  
    // Split by comma, trim each item
    return trimmed.split(',').map(item => item.trim());
  }
  const LLM_HOST = 'http://192.168.111.58:3000';
  
  async function sendToLLM(userInput) {
    const response = await fetch(
      `${LLM_HOST}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization not required for local usage
      },
      body: JSON.stringify({
        model: 'llama-3.2-1b-instruct', // You can set this to anything; LM Studio ignores it
        messages: [
          { role: 'system', content: `You are an AI assistant whose sole job is to convert human movement instructions into an array of the exact commands: forward, backward, left, right.
  
  1. **Allowed outputs**  
     - Each element must be one of: forward, backward, left, right  
     - Output **exactly one** array in square brackets with comma-separated commands **without** any quotes, e.g. [forward,right,forward]  
     - Do **not** output any other text, explanations, apologies, or formatting  
  
  2. **Synonym mapping**  
     Map common synonyms/phrases (case-insensitive) as follows:  
     - **forward**: walk straight, go straight, ahead, forwards, move forward, advance  
     - **backward**: back up, go back, reverse, move backward  
     - **left**: turn left, go left  
     - **right**: turn right, go right  
  
  3. **Parsing rules**  
     - Preserve the order in which commands appear  
     - Ignore any words that aren't mapped  
     - If you detect no valid commands, output []  
  
  4. **Examples**  
     User: “Please walk straight, then turn right, then go forward again.”  
     Assistant: [forward,right,forward]  
     
     User: “Back up a bit, turn left twice, then advance.”  
     Assistant: [backward,left,left,forward]  
     
     User: “Jump and spin.”  
     Assistant: []  
  
  Now process each new user input and respond with **only** the corresponding array of commands.  
  `},
          { role: 'user', content: userInput }
        ],
        temperature: 0.8,
        max_tokens: 2000
      })
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LLM error: ${error}`);
    }
  
    const data = await response.json();
    let commands = AiOutput(data.choices[0].message.content);
    for(let i = 0; i < commands.length; i++){
      console.log("Command from LLM:", commands[i]);
      switch (commands[i]) {
        case 'forward':
          startForward();
          break;
        case 'backward':
          startBackward();
          break;
        case 'left':
          startLeft();
          blockSleep(1000);
          stopMovement();
          break;
        case 'right':
          startRight();
          blockSleep(1000);
          stopMovement();
        default:
          stopMovement();
      }
      //sendCommand(commands[i]);
    }
  }