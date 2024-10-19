import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

function useTyped() {
  const typedElement = useRef(null);

  useEffect(() => {
    if (!typedElement.current) return;

    const typed = new Typed(typedElement.current, {
      strings: [
        "Oh Hey! I'm stan - I develop web apps...",
        "Click on any of the rotating thingies - just do it... DO IT!"
      ],
      typeSpeed: 28,
      backSpeed: 10,
      loop: false,
      backDelay: 3000,
      startDelay: 500,
      showCursor: true,
      fadeOut: true,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 1000,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return typedElement;
}

export default useTyped;
