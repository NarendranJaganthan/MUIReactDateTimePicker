import { createElement, FunctionComponent } from "react";
import classNames from "classnames";

export interface AlertProps {
    id?: string;
    alertStyle?: "default" | "primary" | "success" | "info" | "warning" | "danger";
    className?: string;
    children?: any;
}

export const Alert: FunctionComponent<AlertProps> = ({ alertStyle = "danger", className, children, id }) =>
    children ? <div id={id} className={classNames("alert", `alert-${alertStyle}`, className)}>{children}</div> : null;
