// Highway Library
import Highway from "@dogstudio/highway";
// GSAP Library
import { gsap } from "gsap";
import Quicklink from "quicklink/dist/quicklink.umd";

import "intersection-observer";
// Custom function
import "./scripts/cursor";
import intersectionObserverSection from "./scripts/utils/intersectionObserverSection";
import intersectionObserverVideo from "./scripts/utils/intersectionObserverVideo";
import OTransition from "./scripts/utils/OTransition";

const links = document.querySelectorAll("nav a");
let currentAllLinks = document.querySelectorAll("a");
let currentAllVideos = document.querySelectorAll("video");

//* Some Utils functions *//
const checkHoverLinks = (allLinks) => {
  allLinks.forEach(link => {
    const cursor = document.querySelector("#custom-cursor");
    link.addEventListener('mouseover', (e)=>{
      cursor.classList.add("linkOver");
    });
    link.addEventListener('mouseleave',()=>{
      cursor.classList.remove("linkOver");
    })
  })
};
const checkHoverVideos = (allVideos)=>{
  allVideos.forEach(video => {
    const cursor = document.querySelector("#custom-cursor");
    video.addEventListener('mouseover', (e)=>{
      cursor.classList.add("videoOver");
    });
    video.addEventListener('mouseleave',()=>{
      cursor.classList.remove("videoOver");
    })
  });
}

const checkActiveLink = links => {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    // Clean class
    link.classList.remove("is-active");
    if (link.href === location.href) {
      link.classList.add("is-active");
    }
  }
};

const firstAnimation = () => {
  window.addEventListener("DOMContentLoaded", event => {
    let namespace = document.querySelector("#namespace");
    let tl = gsap.timeline();

    let transitionContainer = document.querySelector(
      ".transitionContainer-content"
    );

    tl.fromTo("#app", 1, { opacity: 0 }, { opacity: 1 }).fromTo(
      "nav",
      0.8,
      { translateY: "-100%", opacity: 0 },
      { translateY: 0, opacity: 1 }
    );

    checkActiveLink(links);
    checkHoverLinks(currentAllLinks);
    checkHoverVideos(currentAllVideos);
    const section = [...document.querySelectorAll("section.content")];
    const video = [...document.querySelectorAll("video")];

    section.forEach(element => {
      intersectionObserverSection.observe(element);
    });

    if (video.length > 0) {
      video.forEach(element => {
        intersectionObserverVideo.observe(element);
      });
    }
  });
};


const H = new Highway.Core({
  transitions: {
    default: OTransition
  }
});

H.on("NAVIGATE_IN", ({ to, location }) => {
  currentAllLinks = document.querySelectorAll("a");
  currentAllVideos = document.querySelectorAll("video");
  // Check Active Links
  checkActiveLink(links);
  checkHoverLinks(currentAllLinks);
  checkHoverVideos(currentAllVideos);
  const section = [...document.querySelectorAll("section.content")];
  const video = [...document.querySelectorAll("video")];

  section.forEach(element => {
    intersectionObserverSection.observe(element);
  });

  if (video.length > 0) {
    video.forEach(element => {
      intersectionObserverVideo.observe(element);
    });
  }
});

H.on("NAVIGATE_END", ({ to }) => {
  Quicklink.listen({
    el: to.view
  });
  const cursor = document.querySelector("#custom-cursor");
  cursor.classList.remove("linkOver");
});

//*Running the initial loading animation *//
removeEventListener(firstAnimation());
