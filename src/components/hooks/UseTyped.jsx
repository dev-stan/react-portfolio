import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

function useTyped() {
  const typedElement = useRef(null);

  useEffect(() => {
    if (!typedElement.current) return;

    const typed = new Typed(typedElement.current, {
      strings: [
        "Hey, I'm Stan - a Full Stack Developer!",
        'Oh wow! Something flew by!',
        'I love building cool stuff with Ruby on Rails and React...',
        "Welcome to my portfolio, damn I've got some nice stuff here",
        'What you see are 3D models, thank Three.js for that...',
        'Scroll down and check out my projects!',
      ],
      typeSpeed: 28,
      backSpeed: 10,
      loop: false,
      backDelay: 7000,
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
