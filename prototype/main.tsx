import { useState, type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { ReactDateTimePickerUI } from "../src/components/ReactDateTimePickerUI";
import "../src/ui/ReactDateTimePicker.css";

import "./prototype.css";

function DemoCard(props: {
    title: string;
    description: string;
    picker: "datetimepicker" | "datepicker" | "timepicker";
}): ReactElement {
    const [value, setValue] = useState<Date | undefined>(new Date());

    return (
        <section className="proto-card">
            <header>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </header>
            <ReactDateTimePickerUI
                picker={props.picker}
                locale="en"
                placeholder={
                    props.picker === "timepicker"
                        ? "Select time"
                        : props.picker === "datepicker"
                          ? "Select date"
                          : "Select date and time"
                }
                dateTimeValue={value}
                onBlur={next => {
                    if (next instanceof Date) {
                        setValue(next);
                    } else if (next === "") {
                        setValue(undefined);
                    }
                }}
                showWeekNumbers={props.picker !== "timepicker"}
                closeOnSelect={false}
                disablePast={false}
                dateFormat={true}
                timeFormat={true}
            />
            <footer className="proto-value">
                Value:{" "}
                <code>{value ? value.toLocaleString() : "(empty)"}</code>
            </footer>
        </section>
    );
}

function App(): ReactElement {
    return (
        <div className="proto-page">
            <header className="proto-hero">
                <p className="proto-eyebrow">InnoVites · Mendix pluggable widget</p>
                <h1>React Date Time Picker</h1>
                <p>
                    Standalone UI prototype using{" "}
                    <a href="https://mui.com/x/react-date-pickers/date-time-picker/" target="_blank" rel="noreferrer">
                        MUI X Desktop Date/Time Pickers
                    </a>
                    . Same component as Mendix runtime and Studio Pro preview.
                </p>
            </header>
            <div className="proto-grid">
                <DemoCard
                    title="Date & time"
                    description="Calendar + analog clock with AM/PM, Today in footer, OK/Cancel."
                    picker="datetimepicker"
                />
                <DemoCard
                    title="Date only"
                    description="Datepicker mode — no time column."
                    picker="datepicker"
                />
                <DemoCard
                    title="Time only"
                    description="Timepicker mode — quick time selection."
                    picker="timepicker"
                />
            </div>
            <aside className="proto-note">
                <strong>Mendix runtime:</strong> run <code>npm run dev</code> with Studio Pro and a test
                app on <code>http://localhost:8080</code>. Set <code>config.projectPath</code> in{" "}
                <code>package.json</code> to your <code>.mpr</code> project folder.
            </aside>
        </div>
    );
}

createRoot(document.getElementById("root")!).render(<App />);
