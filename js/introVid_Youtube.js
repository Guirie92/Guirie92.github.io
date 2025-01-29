// This function creates an <iframe> (and YouTube player)

var timesArray = [255, 10445, 14900];
// Generate a random index
function getRandomStartTime()
{
    var randomIndexRuntime = Math.floor(Math.random() * timesArray.length);
    return randomStartTime = timesArray[randomIndexRuntime];
}

var randomIndex = Math.floor(Math.random() * timesArray.length);
// Use the random time as the start parameter
//var startTime = 14900;
var startTime = 100;

//var randomStartTime = timesArray[randomIndex];
//var randomStartTime = timesArray[randomIndex];
var randomStartTime = 15025;

// 'localStorage' remains until the cache is cleaned or removed, while 'sessionStorage' remains until the browser closes
function setStartTime()
{
    if (sessionStorage.getItem('visited')) {
        // This user has already visited during this session.
        randomStartTime = getRandomStartTime();
    } else {
        // This is a first time visit during this session.
        sessionStorage.setItem('visited', 'true');
        randomStartTime = 15025;
    }

    //return randomStartTime;
}

//document.addEventListener("DOMContentLoaded", function() {
  console.log("Attempting to initialize player...");

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  tag.async = true;
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  attemptToInitializePlayer();
//});

var index = 1;
var isPlayerInitialized = false;
function attemptToInitializePlayer() {

    if (isPlayerInitialized) {
       console.log("Player is already initialized.");
       return;
    }
    console.log("Attempt ", index, "; window.YT: ", window.YT, "; YT.Player: ", YT.Player);
    index++;
    if (window.YT && YT.Player) {
        // YT API is available
        onYouTubeIframeAPIReady();
    } else {
        // Wait for 100ms and try again
        setTimeout(attemptToInitializePlayer, 100);
    }
}



var player;
var videoStarted;
function onYouTubeIframeAPIReady() {
    videoStarted = false;
    console.log("Youtube API ready, videoStarted: " + videoStarted);
    setStartTime();
    //console.log("randomStartTime: ", randomStartTime);
    isPlayerInitialized = true;
    player = new YT.Player('introVideo-loop', {
        videoId: 'jd2fobvR58s', // YouTube video ID (vis)
        //videoId: 'pxWsuJS6WmU', // YouTube video ID (mine)
        playerVars: {
            'start': randomStartTime,
            'autoplay': 1,
            'controls': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'loop': 1,
            'fs': 0,
            'cc_load_policy': 0,
            'iv_load_policy': 3,
            'autohide': 0,
            'mute': 1,
            'playlist': 'pxWsuJS6WmU'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    //player.setPlaybackQuality('hd1080');
    //event.target.playVideo();
    console.log("video ready? player.getPlayerState()", player.getPlayerState());
    //checkPlayerStateChange();
    waitForBuffering(event.target); // Call a new function to handle buffering

    //fadeOutBlackOverlay();
    //playIntroVideo();
}

function waitForBuffering(player) {
    if (player.getVideoLoadedFraction() > 0.2) { // Check if at least 2% of the video is buffered

        console.log("video ready, LOADED FRACTION = ", player.getVideoLoadedFraction());
        console.log("video Quality = ", player.getPlaybackQuality());
        videoStarted = true;
        console.log("Youtube Vid Starting, videoStarted: " + videoStarted);
        console.log("player.getPlayerState() (PRIOR TO PLAY VIDEO) ", player.getPlayerState());
        player.playVideo();
        console.log("player.getPlayerState() (AFTER PLAY VIDEO) ", player.getPlayerState());

        // Begin fade out after the video starts playing
        manuallyPaused = false;
        loopTransition = false;

        var overlay = document.getElementById('introVidTransitionOverlay');
        overlay.classList.remove('instant-transition');
        overlay.style.opacity = "0";

        var introVid = document.getElementById('introVideoContainer');
        introVid.classList.remove('long-transition');
        introVid.style.opacity = "1";


    } else {
        setTimeout(function () {
            console.log("video ready, LOADED FRACTION = ", player.getVideoLoadedFraction());
            waitForBuffering(player); // Check again after a short delay
        }, 1000); // Delay of 1 second
    }
}


var endTime = 15030;
let checkTimeInterval;

let manuallyPaused = false;
let loopTransition = false;


function checkPlayerStateChange()
{
    //player.setPlaybackQuality('hd1080');
    console.log("Custom Check triggered: ", player.getPlayerState());
    console.log("manuallyPaused:", manuallyPaused, "loopTransition:", loopTransition);

    console.log("PlayerStateChange, videoStarted: " + videoStarted);

    if (videoStarted == false) return;

    if (player.getPlayerState() === YT.PlayerState.PLAYING) {

        // Begin fade out after the video starts playing
        manuallyPaused = false;
        loopTransition = false;

        var overlay = document.getElementById('introVidTransitionOverlay');
        overlay.classList.remove('instant-transition');
        overlay.style.opacity = "0";

        var introVid = document.getElementById('introVideoContainer');
        introVid.classList.remove('long-transition');
        introVid.style.opacity = "1";

        //console.log("Current Quality:", player.getPlaybackQuality());
        //console.log("Available Qualities:", player.getAvailableQualityLevels());

        checkTime();
        if (player.getCurrentTime() < endTime) {
            clearTimeout(checkTimeInterval);
            checkTimeInterval = setTimeout(checkTime, 2000); // check every 2 seconds
        }
    }
    else if(player.getPlayerState() === YT.PlayerState.CUED || player.getPlayerState() === YT.PlayerState.BUFFERING/* || event.data == YT.PlayerState.PAUSED*/)
    {
        if(manuallyPaused == true || loopTransition == true) return;
        // If the video is not playing for any reason other than pause, fade out the video and fade in the overlay
        var overlay = document.getElementById('introVidTransitionOverlay');
        overlay.classList.add('instant-transition');  // Adding the class to make the transition instant
        overlay.style.opacity = '1';
        handleVideoStoppage();
        
        //var introVid = document.getElementById('introVideoContainer');
        //introVid.classList.add('long-transition');
        //introVid.style.opacity = "0";
    }

    else if(player.getPlayerState() === YT.PlayerState.PAUSED)
    {
        manuallyPaused = true;
    }
}

function onPlayerStateChange(event) {

    console.log("PlayerStateChange, videoStarted: " + videoStarted);

    if (videoStarted == false) return;


    console.log("Event triggered:", event.data);
    console.log("manuallyPaused:", manuallyPaused, "loopTransition:", loopTransition);
    if (event.data === YT.PlayerState.PLAYING) {

        // Begin fade out after the video starts playing
        manuallyPaused = false;
        loopTransition = false;

        var overlay = document.getElementById('introVidTransitionOverlay');
        overlay.classList.remove('instant-transition');
        overlay.style.opacity = "0";

        var introVid = document.getElementById('introVideoContainer');
        introVid.classList.remove('long-transition');
        introVid.style.opacity = "1";

        //console.log("Current Quality:", player.getPlaybackQuality());
        //console.log("Available Qualities:", player.getAvailableQualityLevels());

        checkTime();
        if (player.getCurrentTime() < endTime) {
            clearTimeout(checkTimeInterval);
            checkTimeInterval = setTimeout(checkTime, 2000); // check every 2 seconds
        }
    }
    else if(event.data === YT.PlayerState.CUED || event.data === YT.PlayerState.BUFFERING/* || event.data == YT.PlayerState.PAUSED*/)
    {
        if(manuallyPaused == true || loopTransition == true) return;
        // If the video is not playing for any reason other than pause, fade out the video and fade in the overlay
        var overlay = document.getElementById('introVidTransitionOverlay');
        overlay.classList.add('instant-transition');  // Adding the class to make the transition instant
        overlay.style.opacity = '1';
        handleVideoStoppage();
        
        //var introVid = document.getElementById('introVideoContainer');
        //introVid.classList.add('long-transition');
        //introVid.style.opacity = "0";
    }

    else if(event.data === YT.PlayerState.PAUSED)
    {
        manuallyPaused = true;
    }
}

function handleVideoStoppage() {

    console.log("Handling Video Stoppage");

    // Fade out the video

    var introVid = document.getElementById('introVideoContainer');
    introVid.classList.add('long-transition');
    introVid.style.opacity = "0";
    var opcaityTemp = window.getComputedStyle(introVid).getPropertyValue("opacity");
    console.log("Vid opcaityTemp:", opcaityTemp);

    //setTimeout(function() {
    //    var introVid = document.getElementById('introVideoContainer');
    //    introVid.classList.add('long-transition');
    //    introVid.style.opacity = "0";
    //
    //    var opcaityTemp = window.getComputedStyle(introVid).getPropertyValue("opacity");
    //    console.log("Vid opcaityTemp:", opcaityTemp);
    //}, 1000);




    // After 7 seconds, check if the video has buffered enough
    setTimeout(function() {
        if (player.getVideoLoadedFraction() >= 0.1) { // 0.01 is equivalent to 1%
            // If buffered enough, fade the video back in and play
            introVid.style.opacity = "1";

            var opcaityTemp = window.getComputedStyle(introVid).getPropertyValue("opacity");
            console.log("Second Vid opcaityTemp:", opcaityTemp);

            player.playVideo();

        } else {
            // If not buffered enough, wait another 7 seconds and recheck
            handleVideoStoppage();
        }
    }, 7000);
}



function checkTime() {
    if (player.getCurrentTime() >= endTime) {
        loopTransition = true;
        console.log("Looping management, loopTransition:", loopTransition);
        transitionfadeBlackOverlayIn(function() {
            //loopTransition = true;
            //console.log("Looping management, loopTransition:", loopTransition);
            player.seekTo(getRandomStartTime());
            transitionfadeBlackOverlayOut();

        });
    } 
    else
    {
        clearTimeout(checkTimeInterval); // Clear existing timeout
        checkTimeInterval = setTimeout(checkTime, 2000);
    }
}

function transitionfadeBlackOverlayIn(callback) {
    var overlay = document.getElementById('introVidTransitionOverlay');
    overlay.classList.remove('instant-transition');
    overlay.style.opacity = '1';
    var transitionTemp = getTransitionDuration('introVidTransitionOverlay');
    setTimeout(callback, transitionTemp);  // Wait for 2 seconds (time it takes for the fade-in to complete)
}

function transitionfadeBlackOverlayOut() {
    var overlay = document.getElementById('introVidTransitionOverlay');
    overlay.classList.remove('instant-transition');
    setTimeout(function() {
        overlay.style.opacity = '0';
    }, 1000);  // Delay to allow the video to buffer/play properly before fade-out begins
}

function getTransitionDuration(elementId) {
    // Get the computed style of the element
    var style = window.getComputedStyle(document.getElementById(elementId));
    
    // Extract the transition-duration property (it's usually in the format "X.XXs")
    var duration = style.getPropertyValue("transition-duration");
    
    // Convert that duration into milliseconds: parseFloat to remove "s" and multiply by 1000
    return parseFloat(duration) * 1000;
}

// Define the callback for the Intersection Observer
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (player && typeof player.playVideo === 'function' && typeof player.pauseVideo === 'function') {
            if(loopTransition) return;
            if (entry.isIntersecting) {
                // The video is in the viewport, play it.
                player.playVideo();
            } else {
                // The video is not in the viewport, pause it.
                player.pauseVideo();
                clearTimeout(checkTimeInterval);
            }
        }
    });
}

// Initialize the Intersection Observer with the callback
let options = {
    root: null, // Using the viewport as the root
    rootMargin: '0px',
    threshold: 0.01
};

let observer = new IntersectionObserver(handleIntersection, options);

// Start observing the video element
let videoElement = document.getElementById('introVideoContainer');
observer.observe(videoElement);
