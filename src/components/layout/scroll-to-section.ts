// Same-page anchor targets (e.g. #features, #about) exist twice in the DOM —
// once in the mobile layout, once in the desktop layout — since both render
// simultaneously and are toggled with Tailwind's `hidden`/`md:hidden` classes.
// A plain href="#id" always targets the first DOM match, which is often the
// hidden one at the current viewport, so nothing visibly scrolls. Find the
// instance that's actually visible instead.
export function scrollToVisibleSection(hash: string) {
  const targets = document.querySelectorAll(hash);
  for (const el of targets) {
    if ((el as HTMLElement).offsetParent !== null) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  }
}
