/**
 * Digital Clock Application
 * Displays current time in multiple time zones
 */

// Define time zones and their UTC offsets
const timeZones = [
    { id: 'ny', name: 'New York', offset: -5 },
    { id: 'london', name: 'London', offset: 0 },
    { id: 'paris', name: 'Paris', offset: 1 },
    { id: 'dubai', name: 'Dubai', offset: 4 },
    { id: 'tokyo', name: 'Tokyo', offset: 9 },
    { id: 'sydney', name: 'Sydney', offset: 10 },
    { id: 'la', name: 'Los Angeles', offset: -8 },
    { id: 'singapore', name: 'Singapore', offset: 8 }
];

/**
 * Format time with leading zeros
 * @param {number} num - Number to format
 * @returns {string} Formatted number with leading zero if needed
 */
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Update clock for a specific time zone
 * @param {string} id - Time zone ID
 * @param {number} offset - UTC offset in hours
 */
function updateClockForTimezone(id, offset) {
    const now = new Date();
    
    // Get UTC time
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();
    
    // Calculate local time for the timezone
    let localHours = (utcHours + offset + 24) % 24;
    let localMinutes = utcMinutes;
    let localSeconds = utcSeconds;
    
    // Format time
    const timeString = `${padZero(localHours)}:${padZero(localMinutes)}:${padZero(localSeconds)}`;
    
    // Format date
    const dateString = now.toLocaleDateString('en-US');
    
    // Update DOM elements
    const timeElement = document.getElementById(`${id}-time`);
    const dateElement = document.getElementById(`${id}-date`);
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
}

/**
 * Update local time display
 */
function updateLocalTime() {
    const now = new Date();
    
    // Format time
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    const dateString = now.toLocaleDateString('en-US');
    
    // Get timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Update DOM
    const localTimeElement = document.getElementById('local-time');
    const localDateElement = document.getElementById('local-date');
    const localTimezoneElement = document.getElementById('local-timezone');
    
    if (localTimeElement) localTimeElement.textContent = timeString;
    if (localDateElement) localDateElement.textContent = dateString;
    if (localTimezoneElement) localTimezoneElement.textContent = timezone;
}

/**
 * Update all clocks
 */
function updateAllClocks() {
    // Update all time zone clocks
    timeZones.forEach(tz => {
        updateClockForTimezone(tz.id, tz.offset);
    });
    
    // Update local time
    updateLocalTime();
}

// Initialize clocks when page loads
window.addEventListener('DOMContentLoaded', () => {
    updateAllClocks();
    // Update every second
    setInterval(updateAllClocks, 1000);
});
