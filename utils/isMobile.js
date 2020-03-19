import React, { useEffect, useState } from 'react';

export const useMediaQuery = query => {
    if (typeof window === 'undefined') return;

    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });
    return matches;
};

export const isMobile = () => useMediaQuery('(max-width: 48rem)');
