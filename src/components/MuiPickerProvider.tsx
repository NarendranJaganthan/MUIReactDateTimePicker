import { createElement, type ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { Locale } from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "@mui/x-date-pickers/themeAugmentation";

/** InnoVites brand palette — https://www.innovites.com/ */
const accent = "#f7a823";
const accentDark = "#d99218";
const accentLight = "#f9c96a";
const accentSoft = "#fff7e9";
const accentGlow = "rgba(247, 168, 35, 0.35)";
const border = "#e8dcc4";
const text = "#1a1a1a";
const muted = "#595959";

const pickerTheme = createTheme({
    palette: {
        primary: { main: accent, dark: accentDark, light: accentLight, contrastText: "#fff" },
        text: { primary: text, secondary: muted },
        divider: border,
        background: { paper: "#fff", default: "#fff7e9" }
    },
    shape: { borderRadius: 10 },
    typography: {
        fontFamily: '"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        button: { textTransform: "none", fontWeight: 600, fontSize: "0.875rem" }
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: { borderRadius: 8 }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    boxShadow: "none",
                    "&:hover": { boxShadow: "none" }
                }
            }
        },
        MuiPickersOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    transition: "box-shadow 0.2s ease, border-color 0.2s ease"
                },
                notchedOutline: { borderColor: border }
            }
        },
        MuiPickerPopper: {
            styleOverrides: {
                paper: {
                    borderRadius: 14,
                    border: `1px solid ${border}`,
                    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.16), 0 8px 20px rgba(15, 23, 42, 0.08)"
                }
            }
        },
        MuiPickersLayout: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    borderRadius: 14,
                    overflow: "hidden"
                },
                contentWrapper: {
                    alignItems: "stretch",
                    padding: 0
                }
            }
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                root: {
                    paddingTop: 14,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    margin: 0
                },
                label: {
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: text
                },
                switchViewButton: { color: muted }
            }
        },
        MuiPickersArrowSwitcher: {
            styleOverrides: {
                button: {
                    color: muted,
                    "&:hover": {
                        backgroundColor: accentSoft,
                        color: accent
                    }
                }
            }
        },
        MuiPickerDay: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: accentSoft },
                    "&.Mui-selected": {
                        backgroundColor: accent,
                        fontWeight: 700,
                        boxShadow: `0 2px 8px ${accentGlow}`,
                        "&:hover": { backgroundColor: accentDark },
                        "&:focus": { backgroundColor: accent }
                    },
                    "&.MuiPickersDay-today": {
                        border: `1.5px solid ${accent}`,
                        backgroundColor: "transparent",
                        "&:not(.Mui-selected)": { color: accent, fontWeight: 600 }
                    }
                }
            }
        },
        MuiDayCalendar: {
            styleOverrides: {
                weekDayLabel: {
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: muted,
                    width: 38,
                    height: 32
                },
                weekContainer: { margin: "2px 0" }
            }
        },
        MuiDateCalendar: {
            styleOverrides: {
                root: {
                    width: 328,
                    maxHeight: "none",
                    margin: 0
                }
            }
        },
        MuiTimeClock: {
            styleOverrides: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    padding: "2.85rem 0.875rem 1rem",
                    minWidth: 272,
                    boxSizing: "border-box"
                },
                arrowSwitcher: {
                    position: "absolute",
                    top: 14,
                    right: 14,
                    left: "auto",
                    width: "auto",
                    maxWidth: "none",
                    margin: 0
                }
            }
        },
        MuiClock: {
            styleOverrides: {
                root: {
                    margin: "6px auto 0",
                    paddingBottom: 4
                },
                clock: {
                    backgroundColor: "#fff",
                    boxShadow: `inset 0 0 0 1px ${border}, 0 4px 24px rgba(247, 168, 35, 0.14)`
                },
                amButton: {
                    borderRadius: 999,
                    border: `1px solid ${border}`,
                    backgroundColor: "#fff",
                    color: muted,
                    fontWeight: 700,
                    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
                    "& .MuiTypography-root": {
                        color: muted,
                        fontWeight: 700,
                        fontSize: "0.8125rem"
                    },
                    "&.MuiClock-selected": {
                        backgroundColor: accent,
                        borderColor: accent,
                        color: "#fff",
                        boxShadow: `0 2px 10px ${accentGlow}`,
                        "& .MuiTypography-root": {
                            color: "#fff"
                        }
                    }
                },
                pmButton: {
                    borderRadius: 999,
                    border: `1px solid ${border}`,
                    backgroundColor: "#fff",
                    color: muted,
                    fontWeight: 700,
                    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
                    "& .MuiTypography-root": {
                        color: muted,
                        fontWeight: 700,
                        fontSize: "0.8125rem"
                    },
                    "&.MuiClock-selected": {
                        backgroundColor: accent,
                        borderColor: accent,
                        color: "#fff",
                        boxShadow: `0 2px 10px ${accentGlow}`,
                        "& .MuiTypography-root": {
                            color: "#fff"
                        }
                    }
                }
            }
        },
        MuiClockPointer: {
            styleOverrides: {
                root: { backgroundColor: accent },
                thumb: {
                    backgroundColor: accent,
                    borderColor: accent,
                    boxShadow: `0 1px 4px ${accentGlow}`
                }
            }
        },
        MuiClockNumber: {
            styleOverrides: {
                root: {
                    color: text,
                    fontWeight: 500,
                    "&.Mui-selected": {
                        color: "#fff",
                        fontWeight: 700
                    }
                }
            }
        }
    }
});

export interface MuiPickerProviderProps {
    locale: Locale;
    children: ReactNode;
}

export function MuiPickerProvider({ locale, children }: MuiPickerProviderProps): ReturnType<typeof createElement> {
    return createElement(
        LocalizationProvider,
        { dateAdapter: AdapterDateFns, adapterLocale: locale },
        createElement(ThemeProvider, { theme: pickerTheme }, children)
    );
}
