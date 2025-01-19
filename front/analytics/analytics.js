import ReactGA from "react-ga4";

export const initializeAnalytics = () => {
  ReactGA.initialize("G-61MECVM10J");
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
