export function trackEvent(category, action) {
    _gaq.push(['_trackEvent', category, action]);
}