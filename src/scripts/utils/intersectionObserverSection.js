
import "intersection-observer";
import { gsap } from "gsap";

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

  export default intersectionObserverSection;