# A Modern Date & Time Picker for Mendix: InnoVites MUI React Date Time Picker

*How we built a desktop-grade calendar and analog clock for Mendix 9+ web apps — and what you get out of the box.*

---

**Reading time:** ~8 minutes  
**Audience:** Mendix developers, solution architects, front-end contributors  
**Author:** InnoVites B.V. · Narendran Jaganathan

---

## Why another date picker?

If you have shipped Mendix web apps with **React client**, you have probably hit the same friction:

- Native browser inputs feel inconsistent across browsers.
- Older custom widgets may not match your design system.
- **Date + time in one flow** (calendar *and* clock, with **OK / Cancel**) is hard to get right in a pluggable widget.
- **Locales**, **12h vs 24h**, and **validation** (min date, disable past, time steps) need predictable behavior — not one-off page logic.

At [InnoVites](https://www.innovites.com/) we work with wire and cable manufacturers on **Microsoft Dynamics**, **Mendix**, and shop-floor systems. Date and time show up everywhere: delivery windows, production slots, maintenance, quotes, and audits. We wanted one picker that feels **modern**, is **easy to configure in Studio Pro**, and is **maintainable** for our team and the Mendix community.

That is how the **InnoVites Date Time Picker** was born — a pluggable widget powered by **[MUI X Date and Time Pickers](https://mui.com/x/react-date-pickers/)** and **[date-fns](https://date-fns.org/)**.

---

## What you get in the UI

The widget supports three modes (set in Studio Pro):

| Mode | User experience |
|------|-----------------|
| **Date & time** | Calendar on the left, **analog time clock** on the right, **AM/PM** when the locale uses 12-hour time |
| **Date only** | Calendar + footer actions |
| **Time only** | Clock + **Cancel** / **OK** |

**Footer actions** (MUI-style, not a separate shortcuts rail):

- **Today** — jump to today’s date (keeps the current time in datetime mode)
- **Cancel** — close without applying pending changes
- **OK** — commit the selection to your Mendix `DateTime` attribute

Styling uses **InnoVites brand colors** (gold accent `#f7a823`, warm cream surfaces) so it fits enterprise apps without looking like a generic blue SaaS control. You can still override CSS variables if your app uses a different palette.

---

## Why MUI X (and not a from-scratch calendar)?

[MUI X](https://mui.com/x/react-date-pickers/) gives you:

- A **desktop layout** that matches what users know from Material Design apps
- An **analog [Time Clock](https://mui.com/x/react-date-pickers/time-clock/)** with hour/minute (and optional seconds) views
- Built-in **localization** hooks (we wire these to **date-fns** locales)
- Accessible keyboard and pointer behavior maintained upstream

We wrap MUI X inside a Mendix **pluggable widget** container so you bind one **`DateTime`** attribute, use standard **visibility / editability**, and optionally drive **On change** and **Valid date** from the widget.

**date-fns** handles parsing and format strings — so custom display formats stay explicit and testable, separate from the visual layer.

---

## Install in your Mendix app (5 steps)

**Requirements:** Mendix **9.x**, **React client** (Web), a `DateTime` attribute on your entity or non-persistent object.

1. Obtain the widget package: `innovites.MUIReactDateTimePicker.mpk` (build from source or use a release artifact).
2. Copy **one** `.mpk` into `<YourApp>/widgets/`.
3. In Studio Pro, sync the app directory (**F4**).
4. From the toolbox, add **InnoVites Date Time Picker** to your page.
5. Set **DateTime** to your attribute (e.g. `$Order/DeliveryDate`).

**Widget ID** (for support and duplicate-package checks):

```text
innovites.muireactdatetimepicker.MUIReactDateTimePicker
```

> **Tip:** Keep only one `.mpk` with this widget ID in `widgets/`. Remove older packages (e.g. `reactdatetimepicker`) or Studio Pro may report that widget packages could not be read.

---

## Studio Pro: the properties you will use most

You do not need to touch XML for day-to-day work. These are the knobs teams use first:

### General

- **DateTime** — the attribute read/written on blur (after OK or valid inline edit)
- **Placeholder** — text template when empty
- **Picker type** — `datetime` | `datepicker` | `timepicker`
- **Locale** — e.g. `en`, `nl`, `de`, `fr` (drives date-fns locale and default 12h/24h behavior)
- **Clearable** — allow clearing the field
- **Read-only style** — show as control or plain text

### Formats

- **Date format** / **Time format** — optional [date-fns format tokens](https://date-fns.org/docs/format); leave empty to follow locale defaults
- **Show week numbers** — optional on the calendar

### Validation

- **Minimum date** / **Maximum date**
- **Disable past dates**
- **Valid date** — optional boolean attribute (widget sets false when the value is invalid)
- **Show a message** + **Message (date/time)** — user-facing validation text

### Time constraints

- Min/max **hours**, **minutes**, **seconds**
- **Hour / minute / second step** — e.g. 15-minute slots

### Events

- **On change** — microflow or nanoflow when the committed value changes

Full property reference: see `docs/WIDGET_DOCUMENTATION.md` in the repository.

---

## Example: delivery appointment on an order

**Goal:** User picks a delivery date and time; past dates are blocked; time is in 15-minute steps.

1. Entity attribute: `DeliveryDateTime` (`DateTime`).
2. Optional: `DeliveryDateValid` (`Boolean`) for form-level validation messaging.
3. Widget settings:
   - Picker type: **datetime**
   - Locale: `en` or `nl` (your app default)
   - Disable past dates: **Yes**
   - Minute step: **15**
   - On change: nanoflow that refreshes a “slot summary” label

**Microflow tip:** Use **On change** for side effects (notifications, recalculations). The attribute is updated when the user confirms with **OK** or leaves the field after a valid value — align your validation microflows with that moment.

---

## Example: date of birth (date only)

- Picker type: **datepicker**
- Maximum date: `[%CurrentDateTime%]` (or a calculated max in a dynamic property if you expose one)
- No time format needed
- Read-only style **text** on view pages, **control** on edit pages

---

## For widget developers: architecture in one screen

```
MUIReactDateTimePicker.tsx     ← Mendix container (props, onBlur → attribute)
    └── ReactDateTimePickerUI  ← MUI X pickers + date-fns
            └── MuiPickerProvider (theme + LocalizationProvider)
            └── muiTimeViewRenderers (analog TimeClock)
```

- **Build:** `npm run build` → `dist/1.0.0/innovites.MUIReactDateTimePicker.mpk`
- **Try UI without Mendix:** `npm run prototype` → http://localhost:5173
- **Hot reload with Mendix:** `npm run dev` (set `config.projectPath` in `package.json`)

Styling lives in `src/ui/ReactDateTimePicker.css`. Because MUI renders the popover in a **portal**, accent CSS variables are re-declared on `.innovites-dtp__popper` so **OK**, **AM/PM**, and selected days stay on-brand.

---

## Customizing colors

Override InnoVites defaults in your theme or page CSS:

```css
.innovites-dtp__popper {
  --innovites-dtp-accent: #f7a823;
  --innovites-dtp-accent-dark: #d99218;
  --innovites-dtp-accent-soft: #fff7e9;
}
```

Apply the same variables on `.innovites-dtp` for the input field and icon.

---

## Limitations (be honest in production)

- **Desktop-first layout** — optimized for mouse/pointer; mobile browsers may show OS-native pickers depending on MUI/device behavior.
- **Timezone** — values are Mendix `DateTime` in the app’s usual semantics; the widget does not add a separate timezone picker.
- **Bundle size** — MUI X + Emotion add weight vs. a minimal native input; acceptable for line-of-business apps that need rich UX.

---

## Troubleshooting quick hits

| Symptom | What to check |
|--------|----------------|
| Widget not in toolbox | Single `.mpk` in `widgets/`, F4 sync, React client enabled |
| OK button hard to see | Rebuild latest package; popover must use portal CSS variables |
| AM/PM faint | Same as above; selected state uses `MuiClock-selected` |
| Wrong 12h/24h | Locale + `timeFormat`; empty time format uses locale preference |
| Duplicate package error | Remove old `innovites.reactdatetimepicker.*` mpk files |

---

## Who is InnoVites?

[InnoVites](https://www.innovites.com/) builds industry-specific software for the **wire and cable** sector — **cableERP**, **cableCORE DesignCenter**, **cableCORE MES**, and more — on Microsoft platforms and **Mendix**. We publish this widget under **MIT** so Mendix teams can adopt the same UX we use in customer projects.

---

## Try it and give feedback

- **Marketplace / package:** `innovites.MUIReactDateTimePicker.mpk`
- **Documentation:** `docs/WIDGET_DOCUMENTATION.md` (full Studio Pro reference)
- **Author:** Narendran Jaganathan · InnoVites B.V.

If you use it in a project, we would love to hear what worked — and what would make **v1.1** more useful (mobile layout, timezone helper, more locales, Atlas UI alignment). Comment on Medium or reach out via [InnoVites](https://www.innovites.com/).

---

## Tags (for Medium)

`Mendix` `Low Code` `React` `Pluggable Widget` `MUI` `Date Picker` `InnoVites` `date-fns` `Web Development`

---

## Publishing checklist (Medium)

1. Copy sections above into Medium (H1 = title; `##` = subheadings).
2. Add a **hero image** — use `assets/mendix-marketplace-mui-react-datetime-picker-innovites.png` from the repo.
3. Set **canonical link** if you also host this on innovites.com.
4. Add **links** to Mendix Marketplace listing when published.
5. Pin a **code snippet** only for install steps (Medium readers skim lists).

*End of article.*
