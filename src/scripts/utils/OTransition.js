
import Highway from "@dogstudio/highway";
// GSAP Library
import { gsap } from "gsap";

class OTransition extends Highway.Transition {
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

  export default OTransition;