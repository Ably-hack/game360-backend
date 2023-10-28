// score-display.js

const WebSocket = require('websocket');
const { APIFootball } = require('api-football');

class ScoreDisplay {
  constructor(apiFootballApiKey) {
    this.apiFootball = new APIFootball(apiFootballApiKey);
    this.socket = new WebSocket('wss://api-football.com/socket/');

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onClose.bind(this);

    this.updateScoreDisplay = () => {};
  }

  onOpen() {
    // Subscribe to the live score feed
    this.socket.send(JSON.stringify({
      type: 'subscribe',
      feed: 'live_scores'
    }));
  }

  onMessage(event) {
    // Handle the incoming message
    const message = JSON.parse(event.data);

    // Update the score display component with the new score
    this.updateScoreDisplay(message.score);
  }

  onClose() {
    // Handle the disconnection
    // ...
  }

  setUpdateScoreDisplayCallback(callback) {
    this.updateScoreDisplay = callback;
  }
}

// Create a new instance of the ScoreDisplay class
const scoreDisplay = new ScoreDisplay('YOUR_API_FOOTBALL_API_KEY');

// example of how to call the code
const progressBar = document.getElementById('progress-bar');

// Set a callback function to update the score display component
scoreDisplay.setUpdateScoreDisplayCallback((score) => {
  // Update the score display component with the new score
  progressBar.value = score;
});

// Start the WebSocket connection
scoreDisplay.socket.open();

// Handle disconnections
scoreDisplay.socket.onclose = () => {
  // Handle the disconnection
  // ...
};
