/*const animatedElement = document.getElementById("animatedElement");

        function handleScroll() {
            const scrollPosition = window.scrollY;
            const elementOffset = animatedElement.offsetTop;

            if (scrollPosition + window.innerHeight > elementOffset) {
                animatedElement.classList.add("visible");
            }
        }

        window.addEventListener("scroll", handleScroll);
*/


/*
    const aboutContainer = document.querySelector(".about-container");
    const elementsToAnimate = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                elementsToAnimate.forEach((element) => {
                    element.classList.add("fade-in-active");
                });
                observer.unobserve(aboutContainer);
            }
        }, { threshold: 0.5 });
    });

    observer.observe(aboutContainer);
    */

    /*
    const elements = document.querySelectorAll('.fade-in');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: .3
    }

    const callbacks = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }
   
    let observer = new IntersectionObserver(callbacks, options);

    
    elements.forEach(element => {
        observer.observe(element)
    });
    */

/* SCROLLING IN AND OUT */

//const elementsToAnimate = document.querySelectorAll('.fade-in');
//const animationThreshold = 0.9;
//
//// Object to track animation states for each element
//const animationStates = {};
//
//function handleScroll() {
//    const scrollPosition = window.scrollY;
//    const windowHeight = window.innerHeight;
//    const triggerPosition = windowHeight * animationThreshold;
//
//    elementsToAnimate.forEach((element, index) => {
//        const elementTop = element.getBoundingClientRect().top + window.scrollY;
//        const elementHeight = element.getBoundingClientRect().height;
//        const elementTriggerPosition = elementTop + elementHeight * animationThreshold;
//        //const elementExitPosition = elementTop + elementHeight * (1 - animationThreshold);
//        const elementExitPosition = elementTop + elementHeight * animationThreshold;
//
//        if (scrollPosition + windowHeight > elementTriggerPosition) {
//            if (!animationStates[index]) {
//
//                // Calculate the remaining time based on the original transition delay
//                //const originalDelay = parseFloat(element.style.transitionDelay) || 0;
//                //element.style.transitionDelay = originalDelay;
//
//                element.classList.add('fade-in-active');
//                animationStates[index] = true;
//            }
//        } else if (scrollPosition + windowHeight < elementExitPosition) {
//            if (animationStates[index]) {
//                element.classList.remove('fade-in-active');
//                animationStates[index] = false;
//            }
//        }
//
//    });
//}
//
//window.addEventListener('scroll', handleScroll);

/*
const elementsToAnimate = document.querySelectorAll('.fade-in');
const animationThreshold = 0.9;

// Object to track animation states for each element
const animationStates = {};

function handleScroll() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  elementsToAnimate.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const elementHeight = element.getBoundingClientRect().height;
    const elementTriggerPosition = elementTop + elementHeight * animationThreshold;
    const elementExitPosition = elementTop + elementHeight * animationThreshold;

    if (scrollPosition + windowHeight > elementTriggerPosition) {
      if (!animationStates[index]) {
        element.style.animation = 'fadeIn 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        element.style.animationDelay = 'var(--custom-delay, 0ms)';
        animationStates[index] = true;
      }
    } else if (scrollPosition + windowHeight < elementExitPosition) {
      if (animationStates[index]) {
        element.style.animation = 'fadeOut 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        element.style.animationDelay = '0s'; // Reset animation delay
        animationStates[index] = false;
      }
    }
  });
}

window.addEventListener('scroll', handleScroll);
*/

//--------------- OBSERVER IN APPROACH --------------- 

//const containersToAnimate = document.querySelectorAll('.fade-in-container');
//const animationThreshold = 0.9;
//
//// Intersection Observer for container elements
//const containerObserver = new IntersectionObserver((entries, observer) => {
//    entries.forEach((entry) => {
//        const container = entry.target;
//        const containerTop = entry.boundingClientRect.top;
//        const containerHeight = entry.boundingClientRect.height;
//        const containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//
//        if (entry.isIntersecting) {
//            // When the container is in the viewport, trigger animations for its children
//            const childElements = container.querySelectorAll('.fade-in-child');
//            childElements.forEach((child) => {
//                container.classList.add('fade-in-active');
//                child.classList.add('fade-in-active');
//            });
//        }
//    });
//}, { threshold: animationThreshold });
//
//containersToAnimate.forEach((container) => {
//    containerObserver.observe(container);
//});

//--------------- OBSERVER IN APPROACH --------------- 



//--------------- OBSERVER IN AND OUT (FROM TOP & BOTTOM) APPROACH  --------------- 

/* TEST 1 */
//const elementsToAnimate = document.querySelectorAll('.fade-in');
//const animationThreshold = 0.9;
//
//const observer = new IntersectionObserver((entries, observer) => {
//    entries.forEach((entry) => {
//        const element = entry.target;
//        const elementTop = entry.boundingClientRect.top;
//        const elementHeight = entry.boundingClientRect.height;
//        const elementTriggerPosition = elementTop + elementHeight * animationThreshold;
//        const elementExitPosition = elementTop + elementHeight * (1 - animationThreshold);
//
//        if (entry.isIntersecting) {
//            const originalDelay = parseFloat(element.style.transitionDelay) || 0;
//            element.style.transitionDelay = originalDelay;
//            element.classList.add('fade-in-active');
//        }
//
//        else if (elementTop < elementExitPosition) {
//            element.classList.remove('fade-in-active');
//        }
//    });
//}, { threshold: animationThreshold });
//
//elementsToAnimate.forEach((element) => {
//    observer.observe(element);
//});

/* TEST 2 */
//const containersToAnimate = document.querySelectorAll('.fade-in-container');
////const animationThreshold = 0.35;
//const animationThreshold = 0.8;
//
//// Intersection Observer for container elements
//const containerObserver = new IntersectionObserver((entries, observer) => {
//    entries.forEach((entry) => {
//        const container = entry.target;
//        const containerTop = entry.boundingClientRect.top;
//        const containerHeight = entry.boundingClientRect.height;
//        const containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//        const containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//
//        if (entry.isIntersecting) {
//            // When the container is in the viewport, trigger animations for its children
//            const childElements = container.querySelectorAll('.fade-in-child');
//            childElements.forEach((child) => {
//                container.classList.add('fade-in-active');
//
//                child.classList.add('fade-in-active');
//                child.style.opacity = 0;
//            });
//        }
//
//        else if (containerTop < containerExitPosition) {
//            const childElements = container.querySelectorAll('.fade-in-child');
//            childElements.forEach((child) => {
//                container.classList.remove('fade-in-active');
//                child.classList.remove('fade-in-active');
//            });
//        }
//    });
//}, { threshold: animationThreshold });
//
//containersToAnimate.forEach((container) => {
//    containerObserver.observe(container);
//});

/* TEST 3 */
//const containersToAnimate = document.querySelectorAll('.fade-in-container');
//const animationThreshold = 0.8;
//
//// Intersection Observer for container elements
//const containerObserver = new IntersectionObserver((entries, observer) => {
//    entries.forEach((entry) => {
//        const container = entry.target;
//        const containerTop = entry.boundingClientRect.top;
//        const containerHeight = entry.boundingClientRect.height;
//        const containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//        const containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//
//        if (entry.isIntersecting) {
//            // When the container is in the viewport, trigger animations for its children
//            const childElements = container.querySelectorAll('.fade-in-child');
//            childElements.forEach((child) => {
//                container.classList.add('fade-in-active');
//                child.classList.add('fade-in-active');
//
//                // Get the delay from the data-delay attribute
//                const delay = parseInt(child.getAttribute('data-delay')) || 0;
//                child.style.transitionDelay = `${delay}ms`;
//            });
//        } else if (containerTop < containerExitPosition) {
//            const childElements = container.querySelectorAll('.fade-in-child');
//            childElements.forEach((child) => {
//                // Remove animation classes and reset transition delay
//                child.classList.remove('fade-in-active');
//                child.style.transitionDelay = '';
//            });
//            container.classList.remove('fade-in-active');
//        }
//    });
//}, { threshold: animationThreshold });
//
//containersToAnimate.forEach((container) => {
//    containerObserver.observe(container);
//});

/* TEST 4 */
//const containersToAnimate = document.querySelectorAll('.fade-in-container');
//const animationThreshold = 0.8;
//let containerState = ''; // To keep track of the container's state
//
//// Intersection Observer for container elements
//const containerObserver = new IntersectionObserver((entries, observer) => {
//    entries.forEach((entry) => {
//        const container = entry.target;
//        const containerTop = entry.boundingClientRect.top;
//        const containerHeight = entry.boundingClientRect.height;
//        const containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//        const containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//
//        if (entry.isIntersecting) {
//
//            var  opcaityTemp = window.getComputedStyle(container).getPropertyValue("opacity");
//            if (opcaityTemp === '0') {
//                // Transition back to the fading-in state
//                containerState = 'hasFaded';
//            }
//            else
//            {
//                containerState = 'hasNotFaded';
//            }
//
//            // When the container is in the viewport, trigger animations for its children
//            const childElements = container.querySelectorAll('.fade-in-child');
//            childElements.forEach((child) => {
//                container.classList.add('fade-in-active');
//                child.classList.add('fade-in-active');
//
//                // Get the delay from the data-delay attribute
//                const delay = parseInt(child.getAttribute('data-delay')) || 0;
//                child.style.transitionDelay = `${delay}ms`;
//            });
//
//            // Check if the container is currently in a fading state
//            if (containerState === 'hasNotFaded') {
//                // Container is still fading out, bypass delay for fade-in
//                childElements.forEach((child) => {
//                    child.style.transitionDelay = '0ms'; // Bypass delay
//                });
//            }
//
//        }
//
//        else if (containerTop < containerExitPosition) {
//            const childElements = container.querySelectorAll('.fade-in-child');
//            childElements.forEach((child) => {
//                // Remove animation classes and reset transition delay
//                child.classList.remove('fade-in-active');
//                child.style.transitionDelay = '';
//            });
//            container.classList.remove('fade-in-active');
//
//            // Check if the container is currently in a fading state
//            if (containerState === 'hasFaded') {
//                // Container is still fading in, bypass delay for fade-out
//                childElements.forEach((child) => {
//                    child.style.transitionDelay = '0ms'; // Bypass delay
//                });
//            }
//
//        }
//    });
//}, { threshold: animationThreshold });
//
//containersToAnimate.forEach((container) => {
//    containerObserver.observe(container);
//});

//--------------- OBSERVER IN AND OUT (FROM TOP & BOTTOM) APPROACH END --------------- 



//--------------- OBSERVER IN AND OUT (FROM TOP) APPROACH  --------------- 

/* Non-Custom-Threshold */
//const containersToAnimate = document.querySelectorAll('.fade-in-container');
//let containerState = ''; // To keep track of the container's state
//const animationThreshold = 0.35;
//
//
//// Intersection Observer for container elements
//const containerObserver = new IntersectionObserver((entries, observer) => {
//    entries.forEach((entry) => {
//        const container = entry.target;
//        const containerTop = entry.boundingClientRect.top;
//        const containerHeight = entry.boundingClientRect.height;
//        const containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//        const containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//
//        if (entry.boundingClientRect.top > 0) {
//
//            if (entry.isIntersecting) {
//
//                var  opcaityTemp = window.getComputedStyle(container).getPropertyValue("opacity");
//                if (opcaityTemp === '0') {
//                    // Transition back to the fading-in state
//                    containerState = 'hasFaded';
//                }
//                else
//                {
//                    containerState = 'hasNotFaded';
//                }
//
//                // When the container is in the viewport, trigger animations for its children
//                const childElements = container.querySelectorAll('.fade-in-child');
//                childElements.forEach((child) => {
//                    container.classList.add('fade-in-active');
//                    child.classList.add('fade-in-active');
//
//                    // Get the delay from the data-delay attribute
//                    const delay = parseInt(child.getAttribute('data-delay')) || 0;
//                    const translationX = parseInt(child.getAttribute('data-translation-x')) || 0;
//                    const translationY = parseInt(child.getAttribute('data-translation-y')) || 0;
//
//                    //child.style.setProperty('--translation-x', translationX);
//                    //child.style.setProperty('--translation-y', translationY);
//                    child.style.setProperty('--translation-x', `${translationX}px`);
//                    child.style.setProperty('--translation-y', `${translationY}px`);
//
//                    child.style.transitionDelay = `${delay}ms`;
//                    //child.style.transform = `translate(${translationX}px, ${translationY}px)`;
//                });
//
//                // Check if the container is currently in a fading state
//                if (containerState === 'hasNotFaded') {
//                    // Container is still fading out, bypass delay for fade-in
//                    childElements.forEach((child) => {
//                        child.style.transitionDelay = '0ms'; // Bypass delay
//                    });
//                }
//
//            }
//
//            else if (containerTop < containerExitPosition) {
//                const childElements = container.querySelectorAll('.fade-in-child');
//                childElements.forEach((child) => {
//                    // Remove animation classes and reset transition delay
//                    child.classList.remove('fade-in-active');
//                    child.style.transitionDelay = '';
//                });
//                container.classList.remove('fade-in-active');
//
//                // Check if the container is currently in a fading state
//                if (containerState === 'hasFaded') {
//                    // Container is still fading in, bypass delay for fade-out
//                    childElements.forEach((child) => {
//                        child.style.transitionDelay = '0ms'; // Bypass delay
//                    });
//                }
//
//            }
//        }
//
//    });
//}, { threshold: animationThreshold });
//
//
//containersToAnimate.forEach((container) => {
//
//    containerObserver.observe(container);
//});

/* CUSTOM THRESHOLD OLD*/

//const containersToAnimate = document.querySelectorAll('.fade-in-container');
//let containerState = ''; // To keep track of the container's state
////const animationThreshold = 0.35;
//let animationThreshold = 0.35; // Set an initial default value
//
//window.addEventListener('resize', function () {
//  containersToAnimate.forEach((container) => {
//    const elementHeight = container.clientHeight;
//    const screenHeight = window.innerHeight;
//    const desiredPercentage = parseFloat(container.getAttribute('data-threshold')) || 0.35; // Adjust this value as needed (e.g., 10%)
//
//    // Calculate the normalized threshold
//    animationThreshold = elementHeight > screenHeight ? (desiredPercentage) / (elementHeight / screenHeight) : desiredPercentage;
//
//    // Use the updated animationThreshold value for your animations
//  });
//});
//
//containersToAnimate.forEach((container) => {
//    // Get the threshold value from the data attribute or use a default value
//    //const animationThreshold = parseFloat(container.getAttribute('data-threshold')) || 0.35;
//
//    //const sectionToObserve = document.querySelector('.section-to-observe');
//    const elementHeight = container.clientHeight;
//    const screenHeight = window.innerHeight;
//    const desiredPercentage = parseFloat(container.getAttribute('data-threshold')) || 0.35; // Adjust this value as needed (e.g., 10%)
//    // Calculate the normalized threshold
//    animationThreshold = elementHeight > screenHeight ? (desiredPercentage) / (elementHeight / screenHeight) : desiredPercentage;
//
//
//
//    //const animationThreshold = calculateContainerThreshold(container);
//    // Intersection Observer for container elements
//    const containerObserver = new IntersectionObserver((entries, observer) => {
//        entries.forEach((entry) => {
//            const container = entry.target;
//            const containerTop = entry.boundingClientRect.top;
//            const containerHeight = entry.boundingClientRect.height;
//            const containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//            const containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//
//
//            if (entry.boundingClientRect.top > 0) {
//
//                if (entry.isIntersecting) {
//
//                    var  opcaityTemp = window.getComputedStyle(container).getPropertyValue("opacity");
//                    if (opcaityTemp === '0') {
//                        // Transition back to the fading-in state
//                        containerState = 'hasFaded';
//                    }
//                    else
//                    {
//                        containerState = 'hasNotFaded';
//                    }
//
//                    // When the container is in the viewport, trigger animations for its children
//                    const childElements = container.querySelectorAll('.fade-in-child');
//                    childElements.forEach((child) => {
//                        container.classList.add('fade-in-active');
//                        child.classList.add('fade-in-active');
//
//                        // Get the delay from the data-delay attribute
//                        const delay = parseInt(child.getAttribute('data-delay')) || 0;
//                        const translationX = parseInt(child.getAttribute('data-translation-x')) || 0;
//                        const translationY = parseInt(child.getAttribute('data-translation-y')) || 0;
//
//                        //child.style.setProperty('--translation-x', translationX);
//                        //child.style.setProperty('--translation-y', translationY);
//                        child.style.setProperty('--translation-x', `${translationX}px`);
//                        child.style.setProperty('--translation-y', `${translationY}px`);
//
//                        child.style.transitionDelay = `${delay}ms`;
//                        //child.style.transform = `translate(${translationX}px, ${translationY}px)`;
//                    });
//
//                    // Check if the container is currently in a fading state
//                    if (containerState === 'hasNotFaded') {
//                        // Container is still fading out, bypass delay for fade-in
//                        childElements.forEach((child) => {
//                            child.style.transitionDelay = '0ms'; // Bypass delay
//                        });
//                    }
//
//                }
//
//                else if (containerTop < containerExitPosition) {
//                    const childElements = container.querySelectorAll('.fade-in-child');
//                    childElements.forEach((child) => {
//                        // Remove animation classes and reset transition delay
//                        child.classList.remove('fade-in-active');
//                        child.style.transitionDelay = '';
//                    });
//                    container.classList.remove('fade-in-active');
//
//                    // Check if the container is currently in a fading state
//                    if (containerState === 'hasFaded') {
//                        // Container is still fading in, bypass delay for fade-out
//                        childElements.forEach((child) => {
//                            child.style.transitionDelay = '0ms'; // Bypass delay
//                        });
//                    }
//
//                }
//            }
//
//        });
//    }, { threshold: animationThreshold });
//
//containerObserver.observe(container);
//});
/* CUSTOM THRESHOLD OLD END */





/* CUSTOM THRESHOLD */

//const containersToAnimate = document.querySelectorAll('.fade-in-container');
//let containerState = ''; // To keep track of the container's state
////const animationThreshold = 0.35;
////let animationThreshold = 0.35; // Set an initial default value
//
//
//// Function to calculate the threshold based on screen size and element height
//function calculateThreshold(container) {
//
//    const elementHeight = container.clientHeight;
//    const screenHeight = window.innerHeight;
//    const desiredPercentage = parseFloat(container.getAttribute('data-threshold')) || 0.35; // Adjust this value as needed (e.g., 10%)
//
//    // Calculate the normalized threshold
//    const animationThreshold = elementHeight > screenHeight ? (desiredPercentage) / (elementHeight / screenHeight) : desiredPercentage;
//    return animationThreshold;
//}
//
//
//function calculateContainerHeight(container) {
//
//    containerHeight = container.getBoundingClientRect().height;
//
//    return containerHeight;
//}
//
//function calculateContainerTop(container) {
//
//    containerTop = container.getBoundingClientRect().top;
//
//    return containerTop;
//}
//
//
//function updateThresholds() {
//    containersToAnimate.forEach((container) => {
//        // Get the threshold value from the data attribute or use a default value
//        //const animationThreshold = parseFloat(container.getAttribute('data-threshold')) || 0.35;
//
//        //const sectionToObserve = document.querySelector('.section-to-observe');
//        const elementHeight = container.clientHeight;
//        screenHeight = window.innerHeight;
//        const desiredPercentage = parseFloat(container.getAttribute('data-threshold')) || 0.35; // Adjust this value as needed (e.g., 10%)
//        // Calculate the normalized threshold
//        animationThreshold = elementHeight > screenHeight ? (desiredPercentage) / (elementHeight / screenHeight) : desiredPercentage;
//
//        //containerHeight = calculateContainerTop(container);
//        //containerTop = calculateContainerHeight(container);
//        //containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//        ////containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//        //containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//        //containerExitPosition2 = containerTop - containerTriggerPosition;
//        //console.log('screenHeight:', screenHeight);
//        //console.log('containerTriggerPosition:', containerTriggerPosition);
//        //console.log('containerExitPosition:', containerExitPosition);
//        //console.log('containerExitPosition2:', containerExitPosition2);
//        //console.log('containerTop:', containerTop);
//        //console.log('containerHeight:', containerHeight);
//
//        //const animationThreshold = calculateContainerThreshold(container);
//        // Intersection Observer for container elements
//        const containerObserver = new IntersectionObserver((entries, observer) => {
//            entries.forEach((entry) => {
//                const container = entry.target;
//
//                //const animationThreshold = calculateThreshold(container);
//
//                //const containerTop = entry.boundingClientRect.top;
//                //const containerHeight = entry.boundingClientRect.height;
//                //const containerHeight = calculateContainerTop(container);
//                //const containerTop = calculateContainerHeight(container);
//
//                //const containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//                //const containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//
//                containerTop = entry.boundingClientRect.top;
//                containerHeight = entry.boundingClientRect.height;
//
//                containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//                containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//
//                //containerHeight = calculateContainerTop(container);
//                //containerTop = calculateContainerHeight(container);
//                //containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//                ////containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//                //containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);
//                //containerExitPosition2 = containerTop - containerTriggerPosition;
//                console.log('screenHeight:', screenHeight);
//                console.log('containerTriggerPosition:', containerTriggerPosition);
//                console.log('containerExitPosition:', containerExitPosition);
//                console.log('containerTop:', containerTop);
//                console.log('containerHeight:', containerHeight);
//
//
//                if (entry.boundingClientRect.top > 0) {
//
//                    if (entry.isIntersecting) {
//
//                        var  opcaityTemp = window.getComputedStyle(container).getPropertyValue("opacity");
//                        if (opcaityTemp === '0') {
//                            // Transition back to the fading-in state
//                            containerState = 'hasFaded';
//                        }
//                        else
//                        {
//                            containerState = 'hasNotFaded';
//                        }
//
//                        // When the container is in the viewport, trigger animations for its children
//                        const childElements = container.querySelectorAll('.fade-in-child');
//                        childElements.forEach((child) => {
//                            container.classList.add('fade-in-active');
//                            child.classList.add('fade-in-active');
//
//                            // Get the delay from the data-delay attribute
//                            const delay = parseInt(child.getAttribute('data-delay')) || 0;
//                            const translationX = parseInt(child.getAttribute('data-translation-x')) || 0;
//                            const translationY = parseInt(child.getAttribute('data-translation-y')) || 0;
//
//                            //child.style.setProperty('--translation-x', translationX);
//                            //child.style.setProperty('--translation-y', translationY);
//                            child.style.setProperty('--translation-x', `${translationX}px`);
//                            child.style.setProperty('--translation-y', `${translationY}px`);
//
//                            child.style.transitionDelay = `${delay}ms`;
//                            //child.style.transform = `translate(${translationX}px, ${translationY}px)`;
//                        });
//
//                        // Check if the container is currently in a fading state
//                        if (containerState === 'hasNotFaded') {
//                            // Container is still fading out, bypass delay for fade-in
//                            childElements.forEach((child) => {
//                                child.style.transitionDelay = '0ms'; // Bypass delay
//                            });
//                        }
//
//                    }
//
//                    //else if (containerTop < containerExitPosition) {
//                    else if (containerTop > (screenHeight*desiredPercentage)) {
//                        const childElements = container.querySelectorAll('.fade-in-child');
//                        childElements.forEach((child) => {
//                            // Remove animation classes and reset transition delay
//                            child.classList.remove('fade-in-active');
//                            child.style.transitionDelay = '';
//                        });
//                        container.classList.remove('fade-in-active');
//
//                        // Check if the container is currently in a fading state
//                        if (containerState === 'hasFaded') {
//                            // Container is still fading in, bypass delay for fade-out
//                            childElements.forEach((child) => {
//                                child.style.transitionDelay = '0ms'; // Bypass delay
//                        });
//                    }
//                }
//            }
//        });
//     }, { threshold: animationThreshold });
//
//    containerObserver.observe(container);
//});
//}
//
//// Initial calculation and setup
//updateThresholds();
//
//// Update the threshold when the window resizes
//window.addEventListener('resize', updateThresholds);

//--------------- OBSERVER IN AND OUT (FROM TOP) APPROACH END --------------- 











//--------------- OBSERVER IN AND OUT (FROM TOP) APPROACH TEST 1 --------------- 


//const containersToAnimate = document.querySelectorAll('.fade-in-container');
//
//function calculateThreshold(container) {
//    const elementHeight = container.clientHeight;
//    const screenHeight = window.innerHeight;
//    const desiredPercentage = parseFloat(container.getAttribute('data-threshold')) || 0.35;
//    const animationThreshold = elementHeight > screenHeight ? (desiredPercentage) / (elementHeight / screenHeight) : desiredPercentage;
//    return animationThreshold; // Return percentage for IntersectionObserver
//}
//
//const observerOptions = {
//    threshold: Array.from(containersToAnimate).map(container => calculateThreshold(container))
//};
//
////const intersectionCallback = (entries) => {
//const containerObserver = new IntersectionObserver((entries) => {
//    entries.forEach(entry => {
//        const container = entry.target;
//        const containerTop = Math.floor(entry.boundingClientRect.top);
//        const containerHeight = entry.boundingClientRect.height;
//        const thresholdPx = window.innerHeight * (parseFloat(container.getAttribute('data-threshold')) || 0.35);
//        console.log(`Threshold for ${container.className}: ${thresholdPx}`);
//        const visibleHeight = Math.min(entry.boundingClientRect.bottom, window.innerHeight) - Math.max(entry.boundingClientRect.top, 0);
//
//        if (entry.boundingClientRect.top > 0) {
//            if (entry.isIntersecting) {
//                // Fade-in logic
//                const childElements = container.querySelectorAll('.fade-in-child');
//                childElements.forEach(child => {
//                    container.classList.add('fade-in-active');
//                    child.classList.add('fade-in-active');
//
//                    const delay = parseInt(child.getAttribute('data-delay')) || 0;
//                    const translationX = parseInt(child.getAttribute('data-translation-x')) || 0;
//                    const translationY = parseInt(child.getAttribute('data-translation-y')) || 0;
//
//                    child.style.setProperty('--translation-x', `${translationX}px`);
//                    child.style.setProperty('--translation-y', `${translationY}px`);
//                    child.style.transitionDelay = `${delay}ms`;
//                });
//            }
//
//            // Check if top 75% has exited from the top or bottom 25% has entered from the bottom
//            else if (visibleHeight < thresholdPx) {
//                // Fade-out logic
//                const childElements = container.querySelectorAll('.fade-in-child');
//                childElements.forEach(child => {
//                    child.classList.remove('fade-in-active');
//                    child.style.transitionDelay = '';
//                });
//                container.classList.remove('fade-in-active');
//            }
//        }
//    });
//}, observerOptions);
//
////const containerObserver = new IntersectionObserver(intersectionCallback, observerOptions);
//
//
//containersToAnimate.forEach(container => containerObserver.observe(container));
//
//window.addEventListener('resize', () => {
//    // Unobserve each container
//    containersToAnimate.forEach(container => containerObserver.unobserve(container));
//
//    // Your threshold update logic remains the same
//    const updatedThresholds = Array.from(containersToAnimate).map(container => calculateThreshold(container));
//    observerOptions.threshold = updatedThresholds;
//
//    // Observe each container again
//    containersToAnimate.forEach(container => containerObserver.observe(container));
//});





//--------------- OBSERVER IN AND OUT (FROM TOP) APPROACH TEST 1 --------------- 



//const containersToAnimate = document.querySelectorAll('.fade-in-container');
////let containerState = ''; // To keep track of the container's state
//const containerStates = new Map();
//const observersMap = new Map();



//function updateThresholds() {
//    console.log("containerObserverCallback being triggered");
//    containersToAnimate.forEach((container) => {
//        // Get the threshold value from the data attribute or use a default value

//        const elementHeight = container.clientHeight;
//        screenHeight = window.innerHeight;
//        const desiredPercentage = parseFloat(container.getAttribute('data-threshold')) || 0.35;
//        // Calculate the normalized threshold
//        animationThreshold = elementHeight > screenHeight ? (desiredPercentage) / (elementHeight / screenHeight) : desiredPercentage;


//        if (observersMap.has(container)) {
//            observersMap.get(container).disconnect();
//        }

//        // Intersection Observer for container elements
//        const containerObserver = new IntersectionObserver((entries, observer) => {
//            entries.forEach((entry) => {
//                console.log("ENTRY:", entry);
//                const container = entry.target;


//                containerTop = entry.boundingClientRect.top;
//                containerHeight = entry.boundingClientRect.height;

//                containerTriggerPosition = containerTop + containerHeight * animationThreshold;
//                containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);

//                //console.log('animationThreshold:', animationThreshold);


//                //if (entry.boundingClientRect.top > 0) {

//                    if (entry.isIntersecting) {

//                        var  opcaityTemp = window.getComputedStyle(container).getPropertyValue("opacity");
//                        if (opcaityTemp === '0') {
//                            // Transition back to the fading-in state
//                            containerStates.set(container, 'hasFaded');
//                        }
//                        else
//                        {
//                            containerStates.set(container, 'hasNotFaded');
//                        }

//                        // When the container is in the viewport, trigger animations for its children
//                        const childElements = container.querySelectorAll('.fade-in-child');
//                        childElements.forEach((child) => {
//                            container.classList.add('fade-in-active');
//                            child.classList.add('fade-in-active');

//                            // Get the delay from the data-delay attribute
//                            const delay = parseInt(child.getAttribute('data-delay')) || 0;
//                            const translationX = parseInt(child.getAttribute('data-translation-x')) || 0;
//                            const translationY = parseInt(child.getAttribute('data-translation-y')) || 0;

//                            child.style.setProperty('--translation-x', `${translationX}px`);
//                            child.style.setProperty('--translation-y', `${translationY}px`);

//                            child.style.transitionDelay = `${delay}ms`;
//                        });

//                        // Check if the container is currently in a fading state
//                        if (containerStates.get(container) === 'hasNotFaded') {
//                            // Container is still fading out, bypass delay for fade-in
//                            childElements.forEach((child) => {
//                                child.style.transitionDelay = '0ms'; // Bypass delay
//                            });
//                        }

//                    }

//                    else if (containerTop < containerExitPosition && entry.boundingClientRect.top > 0) {
//                        const childElements = container.querySelectorAll('.fade-in-child');
//                        childElements.forEach((child) => {
//                            // Remove animation classes and reset transition delay
//                            child.classList.remove('fade-in-active');
//                            child.style.transitionDelay = '';
//                        });
//                        container.classList.remove('fade-in-active');

//                        // Check if the container is currently in a fading state
//                        if (containerStates.get(container) === 'hasFaded') {
//                            // Container is still fading in, bypass delay for fade-out
//                            childElements.forEach((child) => {
//                                child.style.transitionDelay = '0ms'; // Bypass delay
//                        });
//                    }
//                }
//            //}
//        });
//     }, { threshold: animationThreshold });

//    containerObserver.observe(container);

//    // Store the new observer in the map
//    observersMap.set(container, containerObserver);
//});
//}

//// Initial calculation and setup
//updateThresholds();

//// Update the threshold when the window resizes
//window.addEventListener('resize', debounce(updateThresholds, 150));

//function debounce(func, wait) {
//    let timeout;
//    return function executedFunction(...args) {
//        const later = () => {
//            clearTimeout(timeout);
//            func(...args);
//        };
//        clearTimeout(timeout);
//        timeout = setTimeout(later, wait);
//    };
//};


//--------------- OBSERVER IN AND OUT (FROM TOP) APPROACH TEST 2 --------------- 



const containersToAnimate = document.querySelectorAll('.fade-in-container');
//let containerState = ''; // To keep track of the container's state
const containerStates = new Map();
const observersMap = new Map();



function updateThresholds() {
    console.log("containerObserverCallback being triggered");
    containersToAnimate.forEach((container) => {
        // Get the threshold value from the data attribute or use a default value

        const elementHeight = container.clientHeight;
        screenHeight = window.innerHeight;
        const desiredPercentage = parseFloat(container.getAttribute('data-threshold')) || 0.35;
        // Calculate the normalized threshold
        animationThreshold = elementHeight > screenHeight ? (desiredPercentage) / (elementHeight / screenHeight) : desiredPercentage;


        if (observersMap.has(container)) {
            observersMap.get(container).disconnect();
        }

        // Intersection Observer for container elements
        const containerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                console.log("ENTRY:", entry);
                const container = entry.target;


                containerTop = entry.boundingClientRect.top;
                containerHeight = entry.boundingClientRect.height;

                containerTriggerPosition = containerTop + containerHeight * animationThreshold;
                containerExitPosition = containerTop + containerHeight * (1 - animationThreshold);

                //console.log('animationThreshold:', animationThreshold);


                //if (entry.boundingClientRect.top > 0) {

                    if (entry.isIntersecting) {

                        var  opcaityTemp = window.getComputedStyle(container).getPropertyValue("opacity");
                        if (opcaityTemp === '0') {
                            // Transition back to the fading-in state
                            containerStates.set(container, 'hasFaded');
                        }
                        else
                        {
                            containerStates.set(container, 'hasNotFaded');
                        }

                        // When the container is in the viewport, trigger animations for its children
                        const childElements = container.querySelectorAll('.fade-in-child');
                        childElements.forEach((child) => {
                            container.classList.add('fade-in-active');
                            child.classList.add('fade-in-active');

                            // Get the delay from the data-delay attribute
                            const delay = parseInt(child.getAttribute('data-delay')) || 0;
                            const translationX = parseInt(child.getAttribute('data-translation-x')) || 0;
                            const translationY = parseInt(child.getAttribute('data-translation-y')) || 0;

                            child.style.setProperty('--translation-x', `${translationX}px`);
                            child.style.setProperty('--translation-y', `${translationY}px`);

                            child.style.transitionDelay = `${delay}ms`;
                        });

                        // Check if the container is currently in a fading state
                        if (containerStates.get(container) === 'hasNotFaded') {
                            // Container is still fading out, bypass delay for fade-in
                            childElements.forEach((child) => {
                                child.style.transitionDelay = '0ms'; // Bypass delay
                            });
                        }

                    }

                    else if (containerTop < containerExitPosition && entry.boundingClientRect.top > 0) {
                        const childElements = container.querySelectorAll('.fade-in-child');
                        childElements.forEach((child) => {
                            // Remove animation classes and reset transition delay
                            child.classList.remove('fade-in-active');
                            child.style.transitionDelay = '';
                        });
                        container.classList.remove('fade-in-active');

                        // Check if the container is currently in a fading state
                        if (containerStates.get(container) === 'hasFaded') {
                            // Container is still fading in, bypass delay for fade-out
                            childElements.forEach((child) => {
                                child.style.transitionDelay = '0ms'; // Bypass delay
                        });
                    }
                }
            //}
        });
     }, { threshold: animationThreshold });

    containerObserver.observe(container);

    // Store the new observer in the map
    observersMap.set(container, containerObserver);
});
}

// Initial calculation and setup
updateThresholds();

// Update the threshold when the window resizes
window.addEventListener('resize', debounce(updateThresholds, 150));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
