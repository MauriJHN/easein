export const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${String(hours).padStart(2, '0')}`);
    parts.push(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);

    return parts.join(':');
};