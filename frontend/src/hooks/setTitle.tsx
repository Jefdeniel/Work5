import { useEffect } from 'react';

const useSetTitle = (heading: string) => {
  useEffect(() => {
    document.title = `${heading} - Agenda`;
    const headingElement = document.querySelector('h1');
    if (headingElement) {
      headingElement.textContent = heading;
    }
  }, [heading]);
};

export default useSetTitle;
