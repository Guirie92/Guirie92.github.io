//const video = document.getElementById('introVideo-loopLocal');
//
//video.addEventListener('canplaythrough', function() {
//    // Video can be played all the way through without buffering.
//    video.play();
//});

const video = document.getElementById('introVideo-loopLocal');
let isVideoPlaying = false;

//video.addEventListener('canplaythrough', function () {
//    if (!isVideoPlaying) {
//        video.play();
//        isVideoPlaying = true;
//    }
//});


video.addEventListener('canplaythrough', function() {
    // Video can be played all the way through without buffering.
    var overlay = document.getElementById('introVidTransitionOverlay');
    overlay.classList.remove('instant-transition');
    overlay.style.opacity = "0";
    var introVid = document.getElementById('introVideoContainerLocal');
    introVid.classList.remove('long-transition');
    introVid.style.opacity = "1";
    //video.playbackRate = 0.5;
    video.play();
});


//video.addEventListener('waiting', function() {
//    // Video is waiting due to buffering or other issues.
//    var introVid = document.getElementById('introVideoContainerLocal');
//    introVid.style.opacity = "0";
//    setTimeout(function() {
//        if (video.readyState === 4) { // 4 = HAVE_ENOUGH_DATA
//            introVid.style.opacity = "1";
//            video.play();
//        } else {
//            // You may want to call another function here that will check the video's readiness repeatedly.
//        }
//    }, 4000);
//});
// Adjust the 'waiting' event listener to handle buffering more effectively.
video.addEventListener('waiting', function () {
    var introVid = document.getElementById('introVideoContainerLocal');
    introVid.style.opacity = "0";
    checkVideoReadiness(video, introVid);
});

function checkVideoReadiness(video, introVid) {
    if (video.readyState >= 4) {
        introVid.style.opacity = "1";
        video.play();
    } else {
        setTimeout(function () {
            checkVideoReadiness(video, introVid);
        }, 4000); // Check every 4 seconds
    }
}



let videoElement = document.getElementById('introVideoContainerLocal'); 

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // The video is in the viewport, play it.
            video.play();
            //console.log("Video is playing");
        } else {
            // The video is not in the viewport, pause it.
            video.pause();
            //console.log("Video is paused");
        }
    });
}

let options = {
    root: null, // Using the viewport as the root
    rootMargin: '0px',
    //threshold: 0.01
    threshold: 0
};

let observer = new IntersectionObserver(handleIntersection, options);

// Start observing the video element
observer.observe(videoElement);
