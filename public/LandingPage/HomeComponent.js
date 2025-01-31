import { createEventBinding } from "../utils/eventBinding.js";
import { EventEmitter } from "../utils/eventEmitter.js";

class CloudAnimator {
  constructor(leftElement, rightElement, middleElement) {
    this.leftElement = leftElement;
    this.rightElement = rightElement;
    this.middleElement = middleElement;
    this.cloudPositionXLeft = 0;
    this.cloudPositionXRight = window.innerWidth;
    this.cloudMiddlePositionX = window.innerWidth / 2;
    this.cloudMiddleSpeed = 0.5;
  }

  animate() {
    this.cloudPositionXLeft += 1;
    this.cloudPositionXRight -= 1;
    this.cloudMiddlePositionX += this.cloudMiddleSpeed;

    if (this.cloudPositionXLeft > window.innerWidth) {
      this.cloudPositionXLeft = -this.leftElement.width;
    }
    if (this.cloudPositionXRight < -this.rightElement.width) {
      this.cloudPositionXRight = window.innerWidth;
    }
    if (this.cloudMiddlePositionX > window.innerWidth) {
      this.cloudMiddlePositionX = -this.middleElement.width;
    }

    this.leftElement.style.transform = `translateX(${this.cloudPositionXLeft}px)`;
    this.rightElement.style.transform = `translateX(${this.cloudPositionXRight}px)`;
    this.middleElement.style.transform = `translateX(${this.cloudMiddlePositionX}px)`;

    requestAnimationFrame(this.animate.bind(this));
  }
}

export class HomeComponent {
  constructor() {
    this.eventBinding = createEventBinding();
    this.playerName = '';
    this.eventEmitter = new EventEmitter();
    this.cloudAnimator = null;
  }

  render() {
    return `
      <div class="container">
        <img src="./pngwing.com.png" alt="Bomberman Logo" class="logo" />
        <div class="input-group">
          <input type="text" id="playerName" placeholder="ENTER YOUR NAME" aria-label="Enter your name" />
        </div>
        <button id="startGameButton" aria-label="Start Game">START GAME</button>
      </div>
      <div class="footer">
        © 2025 BOMBERMAN
      </div>
      <!-- Two Cloud GIFs added to the homepage -->
      <img id="cloudLeft" src="./cloud.gif" alt="Moving Cloud Left" class="cloud" />
      <img id="cloudRight" src="./cloud.gif" alt="Moving Cloud Right" class="cloud" />
      <img id="cloud" src="./cloud.gif" alt="Moving Cloud Middle" class="cloud" />
    `;
  }

  bind() {
    const startGameButton = document.getElementById('startGameButton');
    const playerNameInput = document.getElementById('playerName');
    const cloudLeft = document.getElementById('cloudLeft');
    const cloudRight = document.getElementById('cloudRight');
    const cloudMiddle = document.getElementById('cloud');

    if (startGameButton && playerNameInput) {
      this.eventBinding.bindEvent(startGameButton, 'click', () => {
        this.playerName = playerNameInput.value.trim();
        if (this.playerName) {
          this.eventEmitter.emit('startGame', this.playerName);
        } else {
          alert('Please enter your name!');
        }
      });
    }

    if (cloudLeft && cloudRight && cloudMiddle) {
      this.cloudAnimator = new CloudAnimator(cloudLeft, cloudRight, cloudMiddle);
      this.cloudAnimator.animate();
    } else {
      console.error('Cloud elements not found!');
    }
  }
}