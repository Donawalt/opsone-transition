import Highway from "@dogstudio/highway";
// GSAP Library
import { gsap } from "gsap";

import Quicklink from "quicklink/dist/quicklink.umd";
import "intersection-observer";

const intersectionObserverSection = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // element is in viewport, do the stuff
        console.log(entry);
        gsap.fromTo(
          entry.target,
          1,
          { opacity: 0 },
          { opacity: 1, delay: 0.5 }
        );
        // it's good to remove observer,
        // if you don't need it any more
        observer.unobserve(entry.target);
      }
    });
  }
);

const intersectionObserverVideo = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(entry);
        setTimeout(() => {
          entry.target.load();
          observer.unobserve(entry.target);
        }, 500);
      }
    });
  }
);

const links = document.querySelectorAll("nav a");
const checkActiveLink = links => {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    // Clean class
    link.classList.remove("is-active");

    // Active link
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

firstAnimation();
// Fade
class Fade extends Highway.Transition {
  in({ from, to, done }) {
    console.log(to);
    let namespace = document.querySelector("#namespace");
    let t = document.createTextNode(String(to.dataset.routerView));
    let transitionContainer = document.querySelector(
      ".transitionContainer-content"
    );
    namespace.appendChild(t);
    // Reset Scroll
    window.scrollTo(0, 0);

    // Remove Old View
    from.remove();

    // Animation
    let tl = gsap.timeline({});

    tl.fromTo(
      namespace,
      0.7,
      { opacity: 0, translateY: "-100%" },
      {
        opacity: 1,
        translateY: 0
      }
    )
      .to(namespace, {
        opacity: 0,
        translateY: "100%",
        duration: 0.7,
        delay: 0.3,
        onComplete: function() {
          namespace.innerHTML = "";
        }
      })
      .to(transitionContainer, {
        translateX: 0,
        translateY: "-100%",
        duration: 0.5,
        pointerEvents: "none",
        onComplete: done
      })
      .fromTo(
        "h1",
        {
          opacity: 0,
          rotate: "5"
        },
        { opacity: 1, duration: 0.7, rotate: 0, delay: "-0.25" }
      );
  }

  out({ from, to, done }) {
    let transitionContainer = document.querySelector(
      ".transitionContainer-content"
    );
    // Animation
    let tl = gsap.timeline();

    tl.fromTo(
      transitionContainer,
      0.7,
      { translateY: "100%", translateX: 0 },
      { translateY: 0, translateX: 0, onComplete: done }
    );
  }
}

const H = new Highway.Core({
  transitions: {
    default: Fade
  }
});

H.on("NAVIGATE_IN", ({ to, location }) => {
  // Check Active Links
  checkActiveLink(links);

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
});

/* import barba from "@barba/core";
import barbaPrefetch from "@barba/prefetch";

barba.use(barbaPrefetch);

barba.init({
  transitions: [
    {
      once(data) {
        console.log("once");
        console.log(data);
      },
      leave(data) {
        console.log("leave");
        console.log(data);
      },
      enter(data) {
        console.log("enter");
        console.log(data);
      }
    }
  ]
}); */
