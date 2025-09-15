export function setupFragmentObserver(
  section: HTMLElement,
  apply: (section: HTMLElement) => void
) {
  const run = () => apply(section)

  let prev = section.getAttribute('data-fragment')
  run()

  const mo = new MutationObserver(() => {
    const curr = section.getAttribute('data-fragment')
    if (curr === prev) return
    prev = curr
    run()
  })

  mo.observe(section, { attributes: true, attributeFilter: ['data-fragment'] })
  return () => mo.disconnect()
}
