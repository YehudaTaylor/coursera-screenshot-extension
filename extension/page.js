'use strict';

var activePBRButton;
var screenshotKey = false;
var playbackSpeedButtons = false;
var screenshotFunctionality = 0;
var screenshotFormat = "png";
var extension = 'png';

function CaptureScreenshot() {

	var appendixTitle = "screenshot." + extension;

	var title;

	var headerEls = document.querySelectorAll("cds-108.video-name.css-1diqjn6.cds-110");

	function SetTitle() {
		if (headerEls.length > 0) {
			title = headerEls[0].innerText.trim();
			return true;
		} else {
			return false;
		}
	}
	
	if (SetTitle() == false) {
		headerEls = document.querySelectorAll("cds-263.video-name.css-1diqjn6.cds-265");

		if (SetTitle() == false)
			title = '';
	}

	var player = document.getElementsByClassName("vjs-tech")[0];

	var time = player.currentTime;

	title += " ";

	let minutes = Math.floor(time / 60)

	time = Math.floor(time - (minutes * 60));

	if (minutes > 60) {
		let hours = Math.floor(minutes / 60)
		minutes -= hours * 60;
		title += hours + "-";
	}

	title += minutes + "-" + time;

	title += " " + appendixTitle;

	var canvas = document.createElement("canvas");

	canvas.width = player.videoWidth;
	canvas.height = player.videoHeight;
	canvas.getContext('2d').drawImage(player, 0, 0, canvas.width, canvas.height);

	var downloadLink = document.createElement("a");
	downloadLink.download = title;

	function DownloadBlob(blob) {
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.click();
	}

	async function ClipboardBlob(blob) {
		const clipboardItemInput = new ClipboardItem({ "image/png": blob });
		await navigator.clipboard.write([clipboardItemInput]);
	}

	// If clipboard copy is needed generate png (clipboard only supports png)
	if (screenshotFunctionality == 1 || screenshotFunctionality == 2) {
		canvas.toBlob(async function (blob) {
			await ClipboardBlob(blob);
			// Also download it if it's needed and it's in the correct format
			if (screenshotFunctionality == 2 && screenshotFormat === 'png') {
				DownloadBlob(blob);
			}
		}, 'image/png');
	}

	// Create and download image in the selected format if needed
	if (screenshotFunctionality == 0 || (screenshotFunctionality == 2 && screenshotFormat !== 'png')) {
		canvas.toBlob(async function (blob) {
			DownloadBlob(blob);
		}, 'image/' + screenshotFormat);
	}
}

function CaptureHalfScreenshot() {

	var appendixTitle = "screenshot." + extension;

	var title;

	var headerEls = document.querySelectorAll("cds-108.video-name.css-1diqjn6.cds-110");

	function SetTitle() {
		if (headerEls.length > 0) {
			title = headerEls[0].innerText.trim();
			return true;
		} else {
			return false;
		}
	}
	
	if (SetTitle() == false) {
		headerEls = document.querySelectorAll("cds-263.video-name.css-1diqjn6.cds-265");

		if (SetTitle() == false)
			title = '';
	}

	var player = document.getElementsByClassName("vjs-tech")[0];

	var time = player.currentTime;

	title += " ";

	let minutes = Math.floor(time / 60)

	time = Math.floor(time - (minutes * 60));

	if (minutes > 60) {
		let hours = Math.floor(minutes / 60)
		minutes -= hours * 60;
		title += hours + "-";
	}

	title += minutes + "-" + time;

	title += " " + appendixTitle;

	var canvas = document.createElement("canvas");

	// console.log("amount is : ", amount)
	// if(amount == "half") {
	// 	console.log("Half screen");
		canvas.width = player.videoWidth / 2;
		canvas.height = player.videoHeight;
		canvas.getContext('2d').drawImage(player, player.videoWidth / 2, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
	// } else {
	// 	console.log("full screen");
	// 	canvas.width = player.videoWidth;
	// 	canvas.height = player.videoHeight;
	// 	canvas.getContext('2d').drawImage(player, 0, 0, canvas.width, canvas.height);
	// }

	var downloadLink = document.createElement("a");
	downloadLink.download = title;

	function DownloadBlob(blob) {
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.click();
	}

	async function ClipboardBlob(blob) {
		const clipboardItemInput = new ClipboardItem({ "image/png": blob });
		await navigator.clipboard.write([clipboardItemInput]);
	}

	// If clipboard copy is needed generate png (clipboard only supports png)
	if (screenshotFunctionality == 1 || screenshotFunctionality == 2) {
		canvas.toBlob(async function (blob) {
			await ClipboardBlob(blob);
			// Also download it if it's needed and it's in the correct format
			if (screenshotFunctionality == 2 && screenshotFormat === 'png') {
				DownloadBlob(blob);
			}
		}, 'image/png');
	}

	// Create and download image in the selected format if needed
	if (screenshotFunctionality == 0 || (screenshotFunctionality == 2 && screenshotFormat !== 'png')) {
		canvas.toBlob(async function (blob) {
			DownloadBlob(blob);
		}, 'image/' + screenshotFormat);
	}
}


function AddScreenshotButton() {
	var ytpRightControls = document.getElementsByClassName("cds-1 css-0 cds-2 cds-3 cds-grid-item cds-48")[2];
	if (ytpRightControls) {
		ytpRightControls.appendChild(screenshotButton);
		ytpRightControls.appendChild(screenshotButton1);
	}

	chrome.storage.sync.get('playbackSpeedButtons', function(result) {
		if (result.playbackSpeedButtons) {
			ytpRightControls.prepend(speed3xButton);
			ytpRightControls.prepend(speed25xButton);
			ytpRightControls.prepend(speed2xButton);
			ytpRightControls.prepend(speed15xButton);
			ytpRightControls.prepend(speed1xButton);

			var playbackRate = document.getElementsByTagName('video')[0].playbackRate;
			switch (playbackRate) {
				case 1:
					speed1xButton.classList.add('SYTactive');
					activePBRButton = speed1xButton;
					break;
				case 2:
					speed2xButton.classList.add('SYTactive');
					activePBRButton = speed2xButton;
					break;
				case 2.5:
					speed25xButton.classList.add('SYTactive');
					activePBRButton = speed25xButton;
					break;
				case 3:
					speed3xButton.classList.add('SYTactive');
					activePBRButton = speed3xButton;
					break;
			}
		}
	});
}

var screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton ytp-button";
screenshotButton.style.width = "auto";
screenshotButton.innerHTML = "Screenshot";
screenshotButton.style.cssFloat = "left";
screenshotButton.style.position = "relative";
screenshotButton.style.zIndex = "1";
screenshotButton.onclick = CaptureScreenshot;
if(screenshotButton) {
	console.log("Screenshot button created")
}

var screenshotButton1 = document.createElement("button");
screenshotButton1.className = "screenshotButton ytp-button";
screenshotButton1.style.width = "auto";
screenshotButton1.innerHTML = "Screenshot Right Half";
screenshotButton1.style.cssFloat = "left";
screenshotButton1.style.position = "relative";
screenshotButton1.style.zIndex = "1";
screenshotButton1.onclick = CaptureHalfScreenshot;
if(screenshotButton1) {
	console.log("Screenshot1 button created")
}


var speed1xButton = document.createElement("button");
speed1xButton.className = "ytp-button SYText";
speed1xButton.innerHTML = "1×";
speed1xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 1;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed15xButton = document.createElement("button");
speed15xButton.className = "ytp-button SYText";
speed15xButton.innerHTML = "1.5×";
speed15xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 1.5;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed2xButton = document.createElement("button");
speed2xButton.className = "ytp-button SYText";
speed2xButton.innerHTML = "2×";
speed2xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 2;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed25xButton = document.createElement("button");
speed25xButton.className = "ytp-button SYText";
speed25xButton.innerHTML = "-5";
speed25xButton.onclick = function() {
	document.getElementsByTagName('video')[0].currentTime += -5;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed3xButton = document.createElement("button");
speed3xButton.className = "ytp-button SYText";
speed3xButton.innerHTML = "+5";
speed3xButton.onclick = function() {
	document.getElementsByTagName('video')[0].currentTime += 5;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

activePBRButton = speed1xButton;

chrome.storage.sync.get(['screenshotKey', 'playbackSpeedButtons', 'screenshotFunctionality', 'screenshotFileFormat'], function(result) {
	screenshotKey = result.screenshotKey;
	playbackSpeedButtons = result.playbackSpeedButtons;
	if (result.screenshotFileFormat === undefined) {
		screenshotFormat = 'png'
	} else {
		screenshotFormat = result.screenshotFileFormat
	}

	if (result.screenshotFunctionality === undefined) {
		screenshotFunctionality = 0;
	} else {
    	screenshotFunctionality = result.screenshotFunctionality;
	}

	if (screenshotFormat === 'jpeg') {
		extension = 'jpg';
	} else {
		extension = screenshotFormat;
	}
});

document.addEventListener('keydown', function(e) {
	if (document.activeElement.contentEditable === 'true' || document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.contentEditable === 'plaintext')
		return true;

	if (playbackSpeedButtons) {
		switch (e.key) {
			case 'q':
				speed1xButton.click();
				e.preventDefault();
				return false;
			case 's':
				speed15xButton.click();
				e.preventDefault();
				return false;
			case 'w':
				speed2xButton.click();
				e.preventDefault();
				return false;
			case 'e':
				speed25xButton.click();
				e.preventDefault();
				return false;
			case 'r':
				speed3xButton.click();
				e.preventDefault();
				return false;
		}
	}

	if (screenshotKey && e.key === 'M') {
		CaptureScreenshot();
		e.preventDefault();
		return false;
	}
});

// AddScreenshotButton();

// Add the "window.onload" event listener
// window.addEventListener('load', AddScreenshotButton);

// //source for the following code: https://chat.openai.com/share/6a590c5d-6047-4d4d-b631-24e3f9817a86
// let codeToRunAfterLoad = null;

// // Listen for messages from the background script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "runCodeAfterLoad") {
//     // Store the code to run in a variable
//     codeToRunAfterLoad = () => {
//       console.log("Running code after page load.");
      
//       // Example: Change the background color of the page to red
//     //   document.body.style.backgroundColor = "red";
//     };

//     // Wait for 10 seconds and then execute the code
//     setTimeout(() => {
//       if (codeToRunAfterLoad) {
//         AddScreenshotButton();
//       }
//     }, 10000);
//   }
// });














// Define a callback function to be executed when mutations occur
const mutationCallback = function(mutationsList, observer) {
	for (let mutation of mutationsList) {
	  if (mutation.type === 'childList') {
		for (let node of mutation.addedNodes) {
		  if (node instanceof HTMLVideoElement) {
			// This block will execute when a video element is added to the DOM.
			const video = node;
			video.addEventListener('loadeddata', function() {
			  // This code will execute when the video is loaded and ready to play.
			  console.log('Video is loaded and ready to play');
			  AddScreenshotButton();
			});
		  }
		}
	  }
	}
  };
  
  // Create a MutationObserver with the defined callback function
  const observer = new MutationObserver(mutationCallback);
  
  // Observe changes to the entire document and its subtree
  observer.observe(document, { childList: true, subtree: true });
  