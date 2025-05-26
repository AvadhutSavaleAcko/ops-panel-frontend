import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

const usePreviousUrl = () => {
    const router = useRouter();
    const [previousUrl, setPreviousUrl] = useState(""); // To store previous URL
    const currentUrlRef = useRef(""); // To store current URL

    useEffect(() => {
        // Update the current URL when the route changes
        const handleRouteChange = (url) => {
            if (currentUrlRef.current) {
                setPreviousUrl(currentUrlRef.current); // Update previous URL
            }
            currentUrlRef.current = url; // Set the new current URL
        };

        // Listen for route changes
        router.events.on('routeChangeStart', handleRouteChange);

        // Initialize the current URL when the component mounts
        currentUrlRef.current = window.location.href;

        // Cleanup event listener
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return previousUrl;
};

const BackTracking = () => {
    const previousUrl = usePreviousUrl();

    return (
        <div style={{
            position: "fixed", top: "0px", display: "flex", backgroundColor: "white", zIndex: 1000, width: "100vw", overflow: "scroll"
        }}>
            <p>Previous URL: {previousUrl}</p>
        </div >
    );
};

export default BackTracking;
