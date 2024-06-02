import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component is used to manage the scroll behavior for specific pages
const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/calendar/overview') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
