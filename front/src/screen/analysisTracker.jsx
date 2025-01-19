// src/AnalyticsTracker.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initializeAnalytics, trackPageView } from "../../analytics/analytics.js";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics(); // Initialize Analytics (runs once)
  }, []);

  useEffect(() => {
    trackPageView(location.pathname); // Track page view on route change
  }, [location]);

  return null;
};

export default AnalyticsTracker;
