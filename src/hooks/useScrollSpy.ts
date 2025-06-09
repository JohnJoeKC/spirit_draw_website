import { useState, useEffect } from 'react';

interface ScrollSpyOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export const useScrollSpy = (sectionIds: string[], options?: ScrollSpyOptions): string => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null, // use the viewport as root
      rootMargin: options?.rootMargin || '0px 0px -25% 0px', // Adjust default as needed, e.g., activate when section is 25% from bottom
      threshold: options?.threshold || 0.5, // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const targetId = entry.target.id;
        
        if (entry.isIntersecting) {
          setActiveSection(`#${targetId}`);
        } else {
          // Optional: Clear active section if no specific section is intersecting above threshold
          // This logic might need refinement based on desired behavior when scrolling out of all sections
          // For instance, you might want the *last* active section to remain highlighted
          // or clear it only if all sections are *not* intersecting.
          // For now, let's stick to setting active on intersection.
          // A more robust way to handle "no active section" would be to check if *any* entry isIntersecting.
          // If not, then perhaps set activeSection to '' or the topmost section if it's above viewport.
        }
      });

      // If, after checking all entries, no section is actively intersecting above the threshold,
      // and we want to clear the active state, we could do something like:
      const anyIntersecting = entries.some(entry => entry.isIntersecting);
      if (!anyIntersecting) {
        // Check scroll position to see if we're above all sections
        const firstSectionEl = document.getElementById(sectionIds[0]?.substring(1));
        if (firstSectionEl && window.scrollY < firstSectionEl.offsetTop) {
            setActiveSection(''); // Clear if scrolled above the first section
        }
        // If not above the first section, and nothing is intersecting,
        // the last active section will remain highlighted, which is often desired.
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const elements = sectionIds.map(id => {
      const targetId = id.startsWith('#') ? id.substring(1) : id;
      return document.getElementById(targetId);
    }).filter(el => el !== null) as Element[];

    if (elements.length > 0) {
      elements.forEach(element => observer.observe(element));
    }

    return () => {
      if (elements.length > 0) {
        elements.forEach(element => observer.unobserve(element));
      }
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return activeSection;
}; 