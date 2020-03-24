import Highway from "@dogstudio/highway";

// GSAP Library
import Tween from "gsap";

import Quicklink from 'quicklink/dist/quicklink.umd';
import 'intersection-observer';
// Fade
class Fade extends Highway.Transition {
  in({ from, to, done }) {
    // Reset Scroll
    window.scrollTo(0, 0);

    // Remove Old View
    from.remove();

    // Animation
    Tween.fromTo(
      to,
      0.7,
      { opacity: 0, translateX: "-100%" },
      {
        opacity: 1,
        translateX: 0,
        onComplete: done
      }
    );
  }

  out({ from, done }) {
    // Animation
    Tween.fromTo(
      from,
      0.5,
      { opacity: 1, translateX: 0 },
      {
        opacity: 0,
        translateX: "100%",
        onComplete: done
      }
    );
  }
}

const H = new Highway.Core({
  transitions: {
    default: Fade
  }
});

const links = document.querySelectorAll("nav a");
H.on("NAVIGATE_IN", ({ to, location }) => {
  // Check Active Link
  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    // Clean class
    link.classList.remove("is-active");

    // Active link
    if (link.href === location.href) {
      link.classList.add("is-active");
    }
  }
});

H.on('NAVIGATE_END', ({to}) => {
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
