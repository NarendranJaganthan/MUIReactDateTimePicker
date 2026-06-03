import { ReactElement, createElement } from "react";
import { ReactDateTimePickerUI } from "./components/ReactDateTimePickerUI";
import { ReactDateTimePickerPreviewProps } from "../typings/ReactDateTimePickerProps";

export function preview(props: ReactDateTimePickerPreviewProps): ReactElement {
    const sampleDate = new Date();
    sampleDate.setHours(14, 30, 0, 0);

    return (
        <ReactDateTimePickerUI
            onBlur={() => void 0}
            placeholder={props.placeholder || "Select date and time"}
            dateFormat={props.dateFormat || true}
            timeFormat={props.timeFormat || true}
            locale={props.locale || "en"}
            picker={props.picker}
            dateTimeValue={sampleDate}
            disabled={props.readOnly}
            readOnlyAsText={props.readOnly && props.readOnlyStyle === "text"}
            maxHours={props.maxHours ?? 23}
            minHours={props.minHours ?? 0}
            hourStep={props.hourStep ?? 1}
            maxMinutes={props.maxMinutes ?? 59}
            minMinutes={props.minMinutes ?? 0}
            minuteStep={props.minuteStep ?? 1}
            maxSeconds={props.maxSeconds ?? 59}
            minSeconds={props.minSeconds ?? 0}
            secondStep={props.secondStep ?? 1}
            showWeekNumbers={props.showWeekNumbers}
            closeOnSelect={props.closeOnSelect}
            disablePast={props.disablePast}
        />
    );
}
