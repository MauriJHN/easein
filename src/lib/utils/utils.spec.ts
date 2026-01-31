import { describe, expect, it } from "vitest";
import { formatTime } from "./format";

describe('utils', () => {
    it('basic formatting test', () => {
        const timeMs = 60000; // 1 minute
        const formatted = formatTime(timeMs);
        expect(formatted).toBe('01:00');
    });

    it('formatting with hours', () => {
        const timeMs = 3661000; // 1 hour, 1 minute, 1 second
        const formatted = formatTime(timeMs);
        expect(formatted).toBe('01:01:01');
    });

    it('formatting less than a minute', () => {
        const timeMs = 45000; // 45 seconds
        const formatted = formatTime(timeMs);
        expect(formatted).toBe('00:45');
    });

    it('formatting zero milliseconds', () => {
        const timeMs = 0; // 0 seconds
        const formatted = formatTime(timeMs);
        expect(formatted).toBe('00:00');
    });
});