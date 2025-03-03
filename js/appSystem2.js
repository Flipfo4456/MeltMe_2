   //66010338 was the creator

   const audio = document.getElementById('background-music');
   const button = document.getElementById('toggle-button');
   const volumeSlider = document.getElementById('volume-slider');
   const AudioPanel = document.getElementById('AudioPanel');
   const songSelector = document.getElementById('song-selector');
   const cassetteSound = document.getElementById('cassette-sound');
   audio.volume = 0.4;
 //   cassetteSound.volume = 0.5;
 
   //audio.play().catch(error => console.log("Auto-play blocked:", error));
       // Toggle Audio panel visibility
   function toggleAudio() {
       AudioPanel.style.display = (AudioPanel.style.display === "block") ? "none" : "block";
   }
   
   // Flag to track the music state
   let isMusicPlaying = false;
   
   // Add event listener for button click
   button.addEventListener('click', () => {
 if (isMusicPlaying) {
     // Pause music immediately
     audio.pause();
     button.textContent = "Turn Music Off";
     button.style.backgroundColor = "rgb(246, 25, 25)";
 } else {
     // Play cassette insert sound first
     cassetteSound.play();
     cassetteSound.currentTime = 0; // Reset sound to start
     
     cassetteSound.onended = () => {

         audio.play();
         button.textContent = "Turn Music On";
         button.style.backgroundColor = "rgb(139, 209, 35)";
     };
 }
 isMusicPlaying = !isMusicPlaying;
});


volumeSlider.addEventListener('input', () => {
 audio.volume = volumeSlider.value;
});
songSelector.addEventListener('change', () => {
 const selectedSong = songSelector.value;
 audio.src = selectedSong; // Update the source
//  audio.play(); // Auto-play the new song
button.textContent = "Changing";
button.style.backgroundColor = "rgb(123, 123, 123)";
isMusicPlaying = true; // Ensure the flag is updated
cassetteSound.play();
cassetteSound.currentTime = 0; // Reset sound to start
cassetteSound.onended = () => {
    
    audio.play();
    button.textContent = "Turn Music On";
    button.style.backgroundColor = "rgb(139, 209, 35)";
     };
});

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
// const rest = document.getElementById("rest");

const timer = document.getElementById("timer");

const moreButton = document.getElementById('more');
moreButton.style.backgroundColor = 'rgb(255, 165, 0)'; // Orange color
moreButton.style.display = 'none';

let timeLeft = 10;
let totalTime = 10; // Set full duration (example: 1 minute)
let extraTime = 6;
let bufferNowTime;
let fireInterval;
let smokeInterval;
let isExtraTimeRunning = false;



function updateButtons() {
 if (isExtraTimeRunning || extraTime === 0) {
     moreButton.style.display = 'inline-block';
     stop.style.display = 'none';
     start.disabled = false;
 } else {
     stop.style.display = 'inline-block';
     moreButton.style.display = 'none';
 }
}


const updateTimer = () => {
 
 const minutes = Math.floor(timeLeft / 60);
 const secs = timeLeft % 60;
 timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
 
};


         const updateExtra = () => {
             
             const min = Math.floor(extraTime / 60);
             const sec = extraTime % 60;
             timer.innerHTML = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
             
         };
         
         if(start.disabled = true && timeLeft == 0){
             alert("Pls, Click reset");
         }
         
         
         
         
         const startTimer = () =>{
             
             start.disabled = true; // Disable start button to prevent spamming
             start.style.backgroundColor = "rgb(74, 116, 11)";
             stop.style.backgroundColor = "rgb(246, 25, 25)";
             
             
             bufferNowTime = setInterval(() => {
                 
                 if (timeLeft > 0) {
                     start.disabled = true;
                     timeLeft--;
                     document.getElementById("candle").style.height = (100 * (timeLeft / totalTime)) + "px";
                     updateTimer();
                 }else{
                     alert("Session end!"); // You can modify this action
                     start.disabled = true;
                     clearInterval(bufferNowTime);
                     clearInterval(fireInterval); // Stop fire particles
                     clearInterval(smokeInterval); // Stop smoke particles when the flame is out
                     document.getElementById("flame").style.display = "none";
                     createSmoke(); 
                     timeLeft=0;
                     updateTimer();
                     
                     //extraTime = 5;
                     const extraCountdown = setInterval(() => {
                         if(timeLeft==0){
                             stop.disabled = true;
                             stop.style.backgroundColor = "rgb(85, 85, 85)";
                             start.disabled = true;
                             start.style.backgroundColor = "rgb(85, 85, 85)";
                         }
                         
                         if (extraTime > 0 && timeLeft==0) {
                             extraTime--;
                             updateExtra(); // Update the timer display
                             updateButtons();
                         } else {
                             reset.disabled = false;
                             clearInterval(extraCountdown);
                             alert("Extra time over!"); // You can modify this action
                         }
                     }, 1000);
                 }
                 
                 
             }, 1000);//-1000ms = 1secs
             
             
             extraTime = 6; //secs
             smokeInterval = setInterval(createSmokeParticles, 1500); // Generate smoke while flame is burning
             fireInterval = setInterval(createFireParticles, 500); // Generate fire particles
         };
         
         
         
         const stopTimer = () => {
             clearInterval(bufferNowTime);
             clearInterval(fireInterval); // Stop fire particles
             clearInterval(smokeInterval); // Stop smoke particles when the flame is out
             
             //  Time under or  =  expected val
             updateTimer();
             start.disabled = false; // can press start
             start.style.backgroundColor = "rgb(146, 232, 16)";
             stop.style.backgroundColor = "rgb(109, 12, 12)";
             
             
             
             
         };
         
         
         
         
         const resetTimer = () => {
             if(timeLeft==10){
                 start.disabled = false;
                 stop.disabled = false;
                 start.style.backgroundColor = "rgb(139, 209, 35)";
                 stop.style.backgroundColor = "rgb(246, 25, 25)";
                 clearInterval(bufferNowTime);
                 clearInterval(fireInterval); // Stop fire particles
                 clearInterval(smokeInterval); // Stop smoke particles when the flame is out
             }
             start.disabled = false;
             stop.disabled = false;
             start.style.backgroundColor = "rgb(139, 209, 35)";
             stop.style.backgroundColor = "rgb(246, 25, 25)";
             clearInterval(bufferNowTime);
             clearInterval(fireInterval); // Stop fire particles
             clearInterval(smokeInterval); // Stop smoke particles when the flame is out
             
             isExtraTimeRunning = false;
             //extraTime = 0;
             updateButtons();
             //extraTime = 0; //secs
             timeLeft = 10; // รีเซ็ตเวลา
             updateTimer();
             
             document.getElementById("candle").style.height = "100px"; // รีเซ็ตความสูงเทียน
             document.getElementById("flame").style.display = "block"; // แสดงเปลวไฟใหม่
             
             
         };
         
         
         
         
         
         
         function createFireParticles() {
             if (timeLeft <= 0) return; // Stop fire particles when time is up
   
             for (let i = 0; i < 3; i++) {  
                 setTimeout(() => {
                     const fire = document.createElement("div");
                     fire.classList.add("fire-particle");
                     
                     // More random positioning
                     let randomX = Math.random() * 20 - 10; // Random left movement (-10 to 10)
                     let randomY = Math.random() * 10 - 5;  // Random upward movement (-5 to 5)
                     
                     fire.style.left = `calc(50% + ${randomX}px)`;
                     fire.style.top = `calc(-50px + ${randomY}px)`;
                     fire.style.animationDuration = (0.5 + Math.random() * 0.5) + "s"; 
                     
                     document.getElementById("candle").appendChild(fire);
                     setTimeout(() => fire.remove(), 1000); // Remove fire after animation
                 }, i * 100);
             }
         }
         
         function createSmokeParticles() {
             if (timeLeft <= 0) return; // Stop smoke particles when time is up
             
             for (let i = 0; i < 3; i++) {  
                 setTimeout(() => {
                     const smoke = document.createElement("div");
                     smoke.classList.add("smoke-particle");
                     
                     // More random positioning
                     let randomX = Math.random() * 20 - 10; // Random left movement (-10 to 10)
                     let randomY = Math.random() * 15 - 7;  // Random slight vertical variation (-7 to 7)
                     
                     smoke.style.left = `calc(50% + ${randomX}px)`;
                     smoke.style.top = `calc(-70px + ${randomY}px)`;
                     smoke.style.animationDuration = (2 + Math.random()) + "s"; // Random duration
                     
                     document.getElementById("candle").appendChild(smoke);
                     setTimeout(() => smoke.remove(), 3000); // Remove after animation
                 }, i * 300);
             }
         }
         
         
         
         function createSmoke() {
             const smoke = document.createElement("div");
             smoke.classList.add("smoke");
             document.getElementById("candle").appendChild(smoke);
             setTimeout(() => smoke.remove(), 2000); // Remove after animation
         }
         updateTimer(); // Initialize the timer display
         
         
         document.addEventListener("visibilitychange", () => {
             if (document.hidden && timeLeft!=0 && timeLeft != totalTime) {
                 audio.pause();
                 button.textContent = "Turn Music Off";
                 button.style.backgroundColor = "rgb(246, 25, 25)";
                 isMusicPlaying = !isMusicPlaying;
                 
                 stopTimer();
                 alert("Dont left the candle on fire! Too dangerous!");
                 
             }
         });
         
         
     moreButton.addEventListener('click', () => {

         if (timeLeft === 0 && extraTime === 0) {
             extraTime += 8; // Add 8 seconds extra time
             updateExtra(); // Update the extra time countdown
             const moreTimeInterval = setInterval(() => {
                 if (extraTime > 0 & timeLeft === 0 ) {
                     extraTime--;
                     updateExtra(); // Update the extra time countdown
                     updateButtons();
                 } else {
                     clearInterval(moreTimeInterval);
                     reset.disabled = false;
                 }
             }, 1000);
             

         }
             
         updateButtons();
     });
   
       start.addEventListener("click", ()=>{
           if(timeLeft == 0){
               start.style.backgroundColor = "rgb(85, 85, 85)";
               alert("Pls, Click reset");
       }else{startTimer();}
       });
   
   
       stop.addEventListener("click", ()=>{
           if(stop.disabled = true && timeLeft == 0){
               stop.style.backgroundColor = "rgb(85, 85, 85)";
       }else{stopTimer();}
       });
       reset.addEventListener("click", resetTimer);
   
   

   
   function goBack() {
               window.history.back();
           }