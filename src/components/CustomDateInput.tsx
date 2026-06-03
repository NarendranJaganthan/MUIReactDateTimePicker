import { forwardRef, createElement, type InputHTMLAttributes, type MouseEvent } from "react";
import classNames from "classnames";

export interface CustomDateInputProps extends InputHTMLAttributes<HTMLInputElement> {
    picker?: "datetimepicker" | "datepicker" | "timepicker";
}

/**
 * Icon + input row. Ref must be on the <input> so react-datepicker focus/click-outside work.
 * className (incl. ignore-onclickoutside when open) is applied to both wrapper and input.
 */
export const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(function CustomDateInput(
    { value, onClick, onChange, placeholder, disabled, picker, className, ...rest },
    ref
) {
    const openIgnoreClass =
        typeof className === "string" && className.includes("react-datepicker-ignore-onclickoutside")
            ? "react-datepicker-ignore-onclickoutside"
            : undefined;

    const handleFieldClick = (event: MouseEvent<HTMLDivElement>): void => {
        if (disabled) {
            return;
        }
        onClick?.(event as unknown as MouseEvent<HTMLInputElement>);
    };

    return createElement(
        "div",
        {
            className: classNames("innovites-dtp__field", className),
            onClick: handleFieldClick,
            role: "presentation"
        },
        createElement("span", {
            className: classNames("innovites-dtp__icon", {
                "innovites-dtp__icon--time": picker === "timepicker"
            }),
            "aria-hidden": true
        }),
        createElement("input", {
            ...rest,
            ref,
            value: value ?? "",
            onChange,
            placeholder,
            disabled,
            className: classNames(
                "innovites-dtp__input",
                "form-control",
                className,
                openIgnoreClass
            ),
            onClick: (event: MouseEvent<HTMLInputElement>) => {
                event.stopPropagation();
                if (!disabled) {
                    onClick?.(event);
                }
            },
            onMouseDown: (event: MouseEvent<HTMLInputElement>) => {
                event.stopPropagation();
            }
        })
    );
});
