// Hook
import React, { useEffect } from 'react';

function useKeyPress(targetKey, callback) {
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
        if (key === targetKey) {
            callback();
        }
    }

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    }); // Empty array ensures that effect is only run on mount and unmount
}

export default useKeyPress;
