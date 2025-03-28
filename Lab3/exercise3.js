"use strict";

let slides;

function loadSlides() {
    /**
     * Load the slides from the JSON file and start the slideshow
     */
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "slides.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                slides = JSON.parse(xhr.responseText).slides;
            } catch (e) {
                console.error("Error parsing JSON: " + e);
                return
            }
            console.log("Slides loaded successfully");
        }
    };
    xhr.send();
}

function playSlide(url){
    let div = document.getElementById("TOP");
    div.innerHTML = "";

    if (url) {
        console.log("Showing slide: " + url);
        let iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.width = "100%";
        iframe.height = "500px";
        div.appendChild(iframe);
    }
}

function playSlideshow() {
    /**
     * Play the slideshow using the slides array
     */
    console.log("Starting slideshow");
    for (let i in slides) {
        setTimeout(playSlide, slides[i].time * 1000, slides[i].url);
    }
    console.log("End of slideshow");
}

/**
 * Load the slides after the page has loaded
 */
window.addEventListener("load", loadSlides);
