import Highway from "@dogstudio/highway";

// GSAP Library
import Tween from "gsap";

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
      0.5,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: done
      }
    );
  }

  out({ from, done }) {
    // Animation
    Tween.fromTo(
      from,
      0.5,
      { opacity: 1 },
      {
        opacity: 0,
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

// Get all menu links
const links = document.querySelectorAll("nav a");

// Listen the `NAVIGATE_IN` event
// This event is sent everytime a `data-router-view` is added to the DOM Tree
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
