window.addEventListener('storage', function (e) {
  if(e.key == "openpages") {
      // Listen if anybody else is opening the same page!
      localStorage.page_available = Date.now();
  }
  if(e.key == "page_available") {
      alert("One more page already open");
  }
}, false);


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
let whiteboardVisible = false;

function showWhiteboard() {
    const iframe = document.getElementById('whiteboard-iframe');

    if (whiteboardVisible) {
        iframe.style.display = 'none';
    } else {
        iframe.style.display = 'block';
    }
    whiteboardVisible = !whiteboardVisible;
}

let codeEditorVisible = false;

        function showCodeEditor() {
            const iframe = document.getElementById('code-editor-iframe');

            if (codeEditorVisible) {
                iframe.style.display = 'none';
            } else {
                iframe.style.display = 'block';
            }
            codeEditorVisible = !codeEditorVisible;
        }

        let github = false;

        function showgithub() {
            const iframe = document.getElementById('github-iframe');

            if (github) {
                iframe.style.display = 'none';
            } else {
                iframe.style.display = 'block';
            }
            github = !github;
        }
        

let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const memberContainer = document.getElementById('members__container');
const memberButton = document.getElementById('members__button');

const chatContainer = document.getElementById('messages__container');
const chatButton = document.getElementById('chat__button');

let activeMemberContainer = false;

memberButton.addEventListener('click', () => {
  if (activeMemberContainer) {
    memberContainer.style.display = 'none';
  } else {
    memberContainer.style.display = 'block';
  }

  activeMemberContainer = !activeMemberContainer;
});

let activeChatContainer = false;

chatButton.addEventListener('click', () => {
  if (activeChatContainer) {
    chatContainer.style.display = 'none';
  } else {
    chatContainer.style.display = 'block';
  }

  activeChatContainer = !activeChatContainer;
});



let displayFrame = document.getElementById('stream__box');
let videoFrames = document.getElementsByClassName('video__container');
let userIdInDisplayFrame = null;


let expandVideoFrame = (e) => {
  let child = displayFrame.children[0];
  if (child) {
    document.getElementById('streams__container').appendChild(child);
  }
  displayFrame.style.display = 'block';
  displayFrame.appendChild(e.currentTarget);
  userIdInDisplayFrame = e.currentTarget.id;

  for (let i = 0; videoFrames.length>i; i++) {
    if (videoFrames[i].id !== userIdInDisplayFrame) {
      videoFrames[i].style.height = '100px';
      videoFrames[i].style.width = '100px';
    }
  }
};

for (let i = 0;  videoFrames.length>i; i++) {
  videoFrames[i].addEventListener('click', expandVideoFrame);
}
let hideDisplayFrame = () => {
  userIdInDisplayFrame = null;
  displayFrame.style.display = null;

  let child = displayFrame.children[0];
  document.getElementById('streams__container').appendChild(child);

  for (let i = 0; videoFrames.length>i; i++) {
    videoFrames[i].style.height = '300px';
    videoFrames[i].style.width = '300px';
  }
};

//const showFeature = (feature)=>{
 // if(feature === 'WhiteBoard'){
 // const urlSearchParams = new URLSearchParams(window.location.search);
 // window.location = "/videocall_interview/whiteboard.html?"+urlSearchParams
//}
//}

displayFrame.addEventListener('click', hideDisplayFrame);


const streamBox = document.getElementById("stream__box");

let isDragging = false;
let offsetX, offsetY;

streamBox.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - streamBox.getBoundingClientRect().left;
    offsetY = e.clientY - streamBox.getBoundingClientRect().top;
    streamBox.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        streamBox.style.left = e.clientX - offsetX + "px";
        streamBox.style.top = e.clientY - offsetY + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    streamBox.style.cursor = "grab";
});
  
let mediaRecorder;
let recordedChunks = [];
let recordedStream;
let videoElement = document.getElementById('recordedVideo');
let downloadButton = document.getElementById('downloadButton');
       
document.getElementById('startRecording').addEventListener('click', startRecording);


startButton.addEventListener('click', startRecording);


async function startRecording() {
  try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      recordedStream = stream.clone();

      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
              recordedChunks.push(e.data);
          }
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        videoElement.src = url;
        videoElement.style.display = 'block';
        downloadButton.style.display = 'block';
      
    };
    mediaRecorder.start();
    startRecording.style.display = 'none';
                stopRecordingButton.style.display = 'block';
            } catch (error) {
                console.error('Error starting recording:', error);
            }

            downloadButton.addEventListener('click', () => {
              const blob = new Blob(recordedChunks, { type: 'video/webm' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'recorded_video.webm';
              a.style.display = 'none';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
          });


        }

       const tabtitle=document.title;
       window.addEventListener("blur",()=>{
        document.title="come back"
       })
       window.addEventListener("focus",()=>{
        document.title =tabtitle
       })

       function toggleFullscreen() {
        if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
          exitFullscreen();
        } else {
          enterFullscreen();
        }
      }
      
      // Function to enter fullscreen
      function enterFullscreen() {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
          element.msRequestFullscreen();
        }
      }
      
      // Function to exit fullscreen
      function exitFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      
      // Event listener to handle fullscreen change
      document.addEventListener("fullscreenchange", fullscreenChangeHandler);
      document.addEventListener("webkitfullscreenchange", fullscreenChangeHandler);
      document.addEventListener("mozfullscreenchange", fullscreenChangeHandler);
      document.addEventListener("MSFullscreenChange", fullscreenChangeHandler);
      
      function fullscreenChangeHandler() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          fullscreenAlert.style.display = 'block';
          setTimeout(() => {
            fullscreenAlert.style.display = 'none';
          }, 2000); // Display the alert for 2 seconds
        }
      }