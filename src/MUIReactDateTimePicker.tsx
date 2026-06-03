import { Component, ReactNode, createElement, Fragment } from "react";
import { isValid, parseISO } from "date-fns";
import { ReactDateTimePickerContainerProps } from "../typings/ReactDateTimePickerProps";
import { ReactDateTimePickerUI } from "./components/ReactDateTimePickerUI";
import { Alert } from "./components/Alert";
import "./ui/ReactDateTimePicker.css";

interface ReactDateTimePickerState {
    validDate: boolean;
}

function toDate(value?: Date): Date | undefined {
    if (!value) {
        return undefined;
    }
    const date = value instanceof Date ? value : parseISO(String(value));
    return isValid(date) ? date : undefined;
}

export default class ReactDateTimePicker extends Component<ReactDateTimePickerContainerProps, ReactDateTimePickerState> {
    private readonly onBlurHandle = this.onBlur.bind(this);

    constructor(props: ReactDateTimePickerContainerProps) {
        super(props);
        this.state = { validDate: true };
    }

    private onBlur(dateTimeSelected: Date | string): void {
        if (dateTimeSelected instanceof Date && isValid(dateTimeSelected)) {
            this.props.dateTimeAttribute.setValue(dateTimeSelected);
            this.setInvalidDateAttribute(true);
        } else if (dateTimeSelected === "") {
            this.props.dateTimeAttribute.setValue(undefined);
            this.setInvalidDateAttribute(true);
        } else {
            this.setInvalidDateAttribute(false);
        }

        if (this.props.onChangeAction?.canExecute) {
            this.props.onChangeAction.execute();
        }
    }

    private setInvalidDateAttribute(newValue: boolean): void {
        if (this.props.invalidDateAttribute) {
            if (this.props.invalidDateAttribute.readOnly) {
                console.warn("User has no write access to 'Valid date' attribute");
            }
            this.props.invalidDateAttribute.setValue(newValue);
        }
        this.setState({ validDate: newValue });
    }

    render(): ReactNode {
        const { props } = this;
        if (props.dateTimeAttribute.status !== "available") {
            return null;
        }

        const placeholder = props.placeholder?.value ?? "";
        const locale = props.locale?.value || undefined;

        const dateFormat =
            props.picker === "datetimepicker" || props.picker === "datepicker"
                ? props.dateFormat?.value || true
                : false;
        const timeFormat =
            props.picker === "datetimepicker" || props.picker === "timepicker"
                ? props.timeFormat?.value || true
                : false;
        const dateTimeValue = toDate(props.dateTimeAttribute.value);
        const minDate = toDate(props.minDateAttribute?.value);
        const maxDate = toDate(props.maxDateAttribute?.value);
        const initialViewDate = toDate(props.initialViewDate?.value);
        const disabled = props.dateTimeAttribute.readOnly;
        const readOnlyAsText = disabled && props.readOnlyStyle === "text";
        const validationFeedback =
            typeof props.dateTimeAttribute.validation === "string" ? props.dateTimeAttribute.validation : undefined;

        return (
            <Fragment>
                <ReactDateTimePickerUI
                    onBlur={this.onBlurHandle}
                    placeholder={placeholder}
                    dateFormat={dateFormat}
                    timeFormat={timeFormat}
                    locale={locale}
                    picker={props.picker}
                    dateTimeValue={dateTimeValue}
                    minDate={minDate}
                    maxDate={maxDate}
                    initialViewDate={initialViewDate}
                    disabled={disabled}
                    readOnlyAsText={readOnlyAsText}
                    tabIndex={props.tabIndex}
                    showWeekNumbers={props.showWeekNumbers}
                    maxHours={props.maxHours}
                    minHours={props.minHours}
                    hourStep={props.hourStep}
                    maxMinutes={props.maxMinutes}
                    minMinutes={props.minMinutes}
                    minuteStep={props.minuteStep}
                    maxSeconds={props.maxSeconds}
                    minSeconds={props.minSeconds}
                    secondStep={props.secondStep}
                    closeOnSelect={props.closeOnSelect}
                    disablePast={props.disablePast}
                />
                {validationFeedback && <Alert>{validationFeedback}</Alert>}
            </Fragment>
        );
    }
}
