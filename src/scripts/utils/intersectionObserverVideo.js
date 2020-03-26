
import "intersection-observer";
import { gsap } from "gsap";

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

  export default intersectionObserverVideo;