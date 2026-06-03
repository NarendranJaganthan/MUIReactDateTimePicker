import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

/** Analog TimeClock for hours / minutes / seconds (MUI X "With Time Clock" demo). */
export const innovitesTimeClockViewRenderers = {
    hours: renderTimeViewClock,
    minutes: renderTimeViewClock,
    seconds: renderTimeViewClock
} as const;
