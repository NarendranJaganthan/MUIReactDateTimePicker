/** Whether the locale typically uses 12-hour time with AM/PM. */
export function localePrefers12Hour(localeTag?: string): boolean {
    try {
        const tag = localeTag?.trim() || "en-US";
        return new Intl.DateTimeFormat(tag, { hour: "numeric" })
            .formatToParts(new Date(2024, 5, 15, 15, 30))
            .some(part => part.type === "dayPeriod");
    } catch {
        return true;
    }
}

/** Default time token string when Mendix passes `timeFormat: true`. */
export function defaultTimeFormatPattern(localeTag?: string, includeSeconds = false): string {
    const seconds = includeSeconds ? ":ss" : "";
    return localePrefers12Hour(localeTag) ? `hh:mm${seconds} a` : `HH:mm${seconds}`;
}

/** True when the format string requests 12-hour / AM-PM display. */
export function formatUsesAmPm(format: string): boolean {
    return /(^|[^H])a{1,2}([^a]|$)/i.test(format);
}
