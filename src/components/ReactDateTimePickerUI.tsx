import { FC, createElement, useCallback, useMemo, useRef, type ChangeEvent } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import type { PickersActionBarAction } from "@mui/x-date-pickers/PickersActionBar";
import type { TimeView } from "@mui/x-date-pickers/models";
import { defaultTimeFormatPattern, formatUsesAmPm, localePrefers12Hour } from "../utils/dateTimeFormat";
import classNames from "classnames";
import {
    enUS,
    nl,
    de,
    fr,
    es,
    it,
    pt,
    pl,
    sv,
    da,
    nb,
    fi,
    cs,
    sk,
    hu,
    ro,
    tr,
    ar,
    ja,
    ko,
    zhCN,
    zhTW
} from "date-fns/locale";
import type { Locale } from "date-fns";
import { endOfDay, isValid, parse, startOfDay, startOfToday } from "date-fns";
import { MuiPickerProvider } from "./MuiPickerProvider";
import { innovitesTimeClockViewRenderers } from "./muiTimeViewRenderers";
import "../ui/ReactDateTimePicker.css";

const localeMap: Record<string, Locale> = {
    en: enUS,
    "en-us": enUS,
    nl,
    de,
    fr,
    es,
    it,
    pt,
    pl,
    sv,
    da,
    nb,
    fi,
    cs,
    sk,
    hu,
    ro,
    tr,
    ar,
    ja,
    ko,
    zh: zhCN,
    "zh-cn": zhCN,
    "zh-tw": zhTW
};

function resolveLocale(code?: string): Locale {
    if (!code) {
        return enUS;
    }
    const key = code.trim().toLowerCase();
    return localeMap[key] ?? enUS;
}

function formatProp(value?: string | boolean): string | undefined {
    if (value === false || value === undefined) {
        return undefined;
    }
    if (value === true) {
        return undefined;
    }
    return value || undefined;
}

function buildTime(date: Date, hours: number, minutes: number, seconds: number): Date {
    const next = new Date(date);
    next.setHours(hours, minutes, seconds, 0);
    return next;
}

export interface ReactDateTimePickerUIProps {
    onBlur: (value: Date | string) => void;
    placeholder?: string;
    dateFormat?: string | boolean;
    timeFormat?: string | boolean;
    locale?: string;
    dateTimeValue?: Date;
    minDate?: Date;
    maxDate?: Date;
    initialViewDate?: Date;
    disabled?: boolean;
    readOnlyAsText?: boolean;
    tabIndex?: number;
    showWeekNumbers?: boolean;
    picker?: "datetimepicker" | "datepicker" | "timepicker";
    maxHours?: number;
    minHours?: number;
    hourStep?: number;
    maxMinutes?: number;
    minMinutes?: number;
    minuteStep?: number;
    maxSeconds?: number;
    minSeconds?: number;
    secondStep?: number;
    closeOnSelect?: boolean;
    disablePast?: boolean;
}

export const ReactDateTimePickerUI: FC<ReactDateTimePickerUIProps> = props => {
    const {
        onBlur,
        placeholder,
        dateFormat,
        timeFormat,
        locale,
        dateTimeValue,
        minDate,
        maxDate,
        initialViewDate,
        disabled,
        readOnlyAsText,
        tabIndex,
        showWeekNumbers,
        picker = "datetimepicker",
        maxHours = 23,
        minHours = 0,
        hourStep = 1,
        maxMinutes = 59,
        minMinutes = 0,
        minuteStep = 1,
        maxSeconds = 59,
        minSeconds = 0,
        secondStep = 1,
        closeOnSelect,
        disablePast
    } = props;

    const rawInputRef = useRef<string>("");
    const dateFnsLocale = useMemo(() => resolveLocale(locale), [locale]);

    const showDate = picker !== "timepicker";
    const showTime = picker !== "datepicker";

    const effectiveMinDate = useMemo(() => {
        const candidates: Date[] = [];
        if (disablePast) {
            candidates.push(startOfToday());
        }
        if (minDate) {
            candidates.push(startOfDay(minDate));
        }
        if (candidates.length === 0) {
            return undefined;
        }
        return new Date(Math.max(...candidates.map(d => d.getTime())));
    }, [disablePast, minDate]);

    const effectiveMaxDate = useMemo(() => (maxDate ? endOfDay(maxDate) : undefined), [maxDate]);

    const minTime = useMemo(
        () => buildTime(new Date(), minHours, minMinutes, minSeconds),
        [minHours, minMinutes, minSeconds]
    );
    const maxTime = useMemo(
        () => buildTime(new Date(), maxHours, maxMinutes, maxSeconds),
        [maxHours, maxMinutes, maxSeconds]
    );

    const resolvedDateFormat = formatProp(dateFormat);
    const resolvedTimeFormat = formatProp(timeFormat);

    const defaultTimePattern = useMemo(
        () => defaultTimeFormatPattern(locale, false),
        [locale]
    );

    const effectiveTimeFormat = resolvedTimeFormat ?? defaultTimePattern;

    const showSeconds = useMemo(() => {
        if (!showTime) {
            return false;
        }
        return /(^|[^a-z])s{1,2}([^a-z]|$)/i.test(effectiveTimeFormat);
    }, [showTime, effectiveTimeFormat]);

    const useTimeConstraints = hourStep > 1 || minuteStep > 1 || showSeconds;

    const displayFormat = useMemo(() => {
        const timePart =
            resolvedTimeFormat ??
            defaultTimeFormatPattern(locale, showSeconds);

        if (picker === "timepicker") {
            return timePart;
        }
        if (picker === "datepicker") {
            return resolvedDateFormat ?? "P";
        }
        if (resolvedDateFormat && resolvedTimeFormat) {
            return `${resolvedDateFormat} ${resolvedTimeFormat}`;
        }
        return resolvedDateFormat ? `${resolvedDateFormat} ${timePart}` : `P ${timePart}`;
    }, [picker, resolvedDateFormat, resolvedTimeFormat, locale, showSeconds]);

    const useAmPm = useMemo(() => {
        if (resolvedTimeFormat) {
            return formatUsesAmPm(resolvedTimeFormat);
        }
        return showTime && localePrefers12Hour(locale);
    }, [resolvedTimeFormat, showTime, locale]);

    const timeViews = useMemo((): readonly TimeView[] => {
        if (!showSeconds) {
            return ["hours", "minutes"];
        }
        return ["hours", "minutes", "seconds"];
    }, [showSeconds]);

    const shouldDisableTime = useCallback(
        (value: Date, view: TimeView): boolean => {
            const hours = value.getHours();
            const minutes = value.getMinutes();
            const seconds = value.getSeconds();

            if (view === "hours") {
                if (hours < minHours || hours > maxHours) {
                    return true;
                }
                return hourStep > 1 && hours % hourStep !== 0;
            }
            if (view === "minutes") {
                if (hours === minHours && minutes < minMinutes) {
                    return true;
                }
                if (hours === maxHours && minutes > maxMinutes) {
                    return true;
                }
                return minuteStep > 1 && minutes % minuteStep !== 0;
            }
            if (view === "seconds") {
                if (seconds < minSeconds || seconds > maxSeconds) {
                    return true;
                }
                return secondStep > 1 && seconds % secondStep !== 0;
            }
            return false;
        },
        [
            hourStep,
            maxHours,
            maxMinutes,
            maxSeconds,
            minHours,
            minMinutes,
            minSeconds,
            minuteStep,
            secondStep
        ]
    );

    const commitBlur = useCallback(() => {
        const raw = rawInputRef.current.trim();
        if (!raw) {
            onBlur("");
            return;
        }
        if (dateTimeValue && isValid(dateTimeValue)) {
            onBlur(dateTimeValue);
            return;
        }
        const parsed = parse(raw, displayFormat, new Date(), { locale: dateFnsLocale });
        onBlur(isValid(parsed) ? parsed : raw);
    }, [dateFnsLocale, dateTimeValue, displayFormat, onBlur]);

    const handleChange = useCallback(
        (value: Date | null) => {
            if (value && isValid(value)) {
                onBlur(value);
            } else if (value === null) {
                onBlur("");
            }
        },
        [onBlur]
    );

    const pickerValue = dateTimeValue && isValid(dateTimeValue) ? dateTimeValue : null;
    const referenceDate = initialViewDate ?? dateTimeValue ?? undefined;

    const actionBarActions = useMemo((): PickersActionBarAction[] => {
        if (showDate) {
            return ["today", "cancel", "accept"];
        }
        return ["cancel", "accept"];
    }, [showDate]);

    const slotProps = useMemo(
        () => ({
            actionBar: {
                actions: actionBarActions,
                sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "100%",
                    "& .MuiButton-root": {
                        visibility: "visible",
                        opacity: 1
                    }
                }
            },
            field: {
                clearable: !disabled,
                onBlur: commitBlur
            },
            textField: {
                placeholder,
                disabled,
                fullWidth: true,
                size: "small" as const,
                inputProps: { tabIndex },
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                    rawInputRef.current = event.target.value;
                },
                className: "innovites-dtp__mui-field"
            },
            layout: {
                className: classNames("innovites-dtp__layout", `innovites-dtp__layout--${picker}`)
            },
            popper: {
                className: classNames("innovites-dtp__popper", `innovites-dtp__popper--${picker}`),
                placement: "bottom-start" as const
            },
            desktopPaper: {
                className: "innovites-dtp__paper"
            }
        }),
        [actionBarActions, placeholder, disabled, tabIndex, commitBlur, picker]
    );

    const sharedProps = useMemo(
        () => ({
            value: pickerValue,
            onChange: handleChange,
            format: displayFormat,
            disabled,
            referenceDate,
            minDate: showDate ? effectiveMinDate : undefined,
            maxDate: showDate ? effectiveMaxDate : undefined,
            disablePast: showDate ? disablePast : undefined,
            closeOnSelect: closeOnSelect ?? false,
            slotProps,
            className: "innovites-dtp__mui-picker"
        }),
        [
            pickerValue,
            handleChange,
            displayFormat,
            disabled,
            referenceDate,
            showDate,
            effectiveMinDate,
            effectiveMaxDate,
            disablePast,
            closeOnSelect,
            slotProps
        ]
    );

    const timeProps = useMemo(
        () => ({
            ampm: useAmPm,
            ampmInClock: useAmPm,
            viewRenderers: innovitesTimeClockViewRenderers,
            timeSteps: {
                hours: hourStep > 0 ? hourStep : 1,
                minutes: minuteStep > 0 ? minuteStep : 1,
                seconds: secondStep > 0 ? secondStep : 1
            },
            minTime: useTimeConstraints ? minTime : undefined,
            maxTime: useTimeConstraints ? maxTime : undefined,
            shouldDisableTime: useTimeConstraints ? shouldDisableTime : undefined
        }),
        [
            useAmPm,
            hourStep,
            minuteStep,
            secondStep,
            minTime,
            maxTime,
            useTimeConstraints,
            shouldDisableTime
        ]
    );

    if (readOnlyAsText) {
        const text =
            dateTimeValue && isValid(dateTimeValue)
                ? new Intl.DateTimeFormat(locale || undefined, {
                      dateStyle: showDate ? "medium" : undefined,
                      timeStyle: showTime ? "short" : undefined
                  }).format(dateTimeValue)
                : "—";
        return (
            <span className="innovites-dtp innovites-dtp--text" tabIndex={tabIndex}>
                {text}
            </span>
        );
    }

    let pickerElement: ReturnType<typeof createElement>;

    if (picker === "datepicker") {
        pickerElement = createElement(DesktopDatePicker, {
            ...sharedProps,
            displayWeekNumber: showWeekNumbers
        });
    } else if (picker === "timepicker") {
        pickerElement = createElement(DesktopTimePicker, {
            ...sharedProps,
            ...timeProps,
            views: timeViews
        });
    } else {
        pickerElement = createElement(DesktopDateTimePicker, {
            ...sharedProps,
            ...timeProps,
            displayWeekNumber: showWeekNumbers
        });
    }

    return (
        <div
            className={classNames("innovites-dtp", {
                "innovites-dtp--disabled": disabled,
                "innovites-dtp--date": picker === "datepicker",
                "innovites-dtp--time": picker === "timepicker",
                "innovites-dtp--datetime": picker === "datetimepicker"
            })}
        >
            <MuiPickerProvider locale={dateFnsLocale}>{pickerElement}</MuiPickerProvider>
        </div>
    );
};
