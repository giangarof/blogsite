import ReactGA from "react-ga4";

// export const initializeAnalytics = () => {
//   ReactGA.initialize("G-61MECVM10J");
// };

// export const trackPageView = (path) => {
//   ReactGA.send({ hitType: "pageview", page: path });
// };


// src/analytics.js
export const initializeGoogleAnalytics = () => {
    if (!window.gtag) {
      // Create the script tag for gtag.js
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-61MECVM10J";
      document.head.appendChild(script);
  
      // Initialize gtag
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", "G-61MECVM10J");
      };
    }
  };
  