# Mendix Marketplace — Publish Component (copy-paste)

Use this content for **Step 2: General Information** (and related steps). Adjust industry tags if your listing policy differs.

---

## Cover image

| Requirement | Value |
|-------------|--------|
| Format | `.png` or `.jpg` |
| Max size | 1 MB |
| Min resolution | 600 × 420 px |

**Upload file (recommended):**

`assets/marketplace-cover.jpg` (~120 KB, 1280×853)

**Alternative:**

`assets/marketplace-cover.png` (max quality under 1 MB)

Regenerate from source: `powershell -File assets/export-marketplace-images.ps1` (set `-Source` to `marketplace-cover-source.png`).

---

## Component tagline (max 80 characters)

```
MUI date & time picker for Mendix 9+ — calendar, analog clock, locales.
```

**Character count:** 72

**Alternatives (pick one):**

```
Desktop date-time picker with calendar, clock, validation & date-fns locales.
```
(76 chars)

```
Pick dates and times in Mendix with MUI X — datetime, date-only, or time-only.
```
(77 chars)

---

## About (max 500 words)

Copy into the rich-text **About** field:

---

The **InnoVites Date Time Picker** is a Mendix pluggable widget for **Mendix 9+ web applications** that use the **React client**. It gives your users a modern, desktop-style way to select **dates**, **times**, or **both** — without relying on inconsistent native browser inputs.

### What makes it different

The UI is built with **[MUI X Date and Time Pickers](https://mui.com/x/react-date-pickers/)**: a familiar calendar, an **analog time clock**, and a clear action bar (**Today**, **Cancel**, **OK**). Parsing, formatting, and locales use **[date-fns](https://date-fns.org/)**, so display rules stay explicit and maintainable in Studio Pro.

### Three picker modes

- **Date & time** — calendar and clock side by side  
- **Date only** — calendar with footer actions  
- **Time only** — clock with AM/PM (when the locale/format uses 12-hour time)

### Built for real Mendix apps

- Binds to a standard **`DateTime`** attribute  
- Supports **visibility**, **editability**, and **read-only** (control or text)  
- Optional **On change** action (microflow or nanoflow)  
- Optional **Valid date** boolean plus customizable validation message  
- **Min/max date**, **disable past dates**, and **time constraints** (min/max hours, minutes, seconds, steps)  
- **Clearable** field, optional **week numbers**, and **custom date-fns format strings**  
- **Offline-capable** and includes a **Studio Pro design preview**

### Locales and formats

Set a locale (e.g. `en`, `nl`, `de`, `fr`) for date-fns. Leave format properties empty to follow locale defaults, or supply date-fns tokens for full control. The widget follows **12-hour vs 24-hour** behavior from the locale and your time format.

### Styling

The default theme uses a **generic SaaS blue** palette (**#2563eb**) that fits most enterprise UIs. Override CSS variables on `.innovites-dtp` and `.innovites-dtp__popper` to match your brand.

### Typical use cases

- Scheduling deliveries, appointments, or maintenance windows  
- Production and logistics timestamps  
- Filters and search forms with date/time ranges  
- Any form where users need a clear calendar/clock instead of free-text entry

### Requirements

- Mendix **9.x** with **React client** (Web)  
- A **`DateTime`** attribute on your entity or non-persistent object  
- Modern desktop browsers (desktop-oriented picker layout)

### Package

- Widget ID: `innovites.muireactdatetimepicker.MUIReactDateTimePicker`  
- Install a single `.mpk`: `innovites.MUIReactDateTimePicker.mpk`  
- **MIT** license · **InnoVites B.V.**

For full property reference and troubleshooting, see the widget documentation in the repository.

---

## Industry (max 3 tags)

Recommended (matches manufacturing / logistics / enterprise forms):

1. **Manufacturing Industries**
2. **Logistics**
3. **Banking** *(optional — remove if you prefer a third operational tag)*

**Alternative third tag:** **Insurance** or **Government** if your primary audience differs.

---

## Category (max 3 tags)

Required selections (as in your draft):

1. **User Interface**
2. **Utility**

*(Only 2 required — Marketplace allows up to 3; a third is optional, e.g. **Integration** if available.)*

---

## Step 3 hints (License & Support) — draft

| Field | Suggested value |
|--------|----------------|
| License | MIT |
| Support contact | info@innovites.com |
| Publisher | InnoVites B.V. |
| Website | https://www.innovites.com/ |

---

## Step 4 hints (Media & Documentation) — draft

- Link to GitHub or internal docs URL if published  
- Attach 2–4 screenshots: datetime mode, date-only, time-only, validation state  
- Reference blog: `docs/blog/medium-innovites-mui-datetime-picker.md`

---

*Generated for InnoVites MUI React Date Time Picker v1.0.0.*
