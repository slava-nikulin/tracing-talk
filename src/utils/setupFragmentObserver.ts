export function setupFragmentObserver(
  section: HTMLElement,
  apply: (section: HTMLElement) => void
) {
  const run = () => apply(section)

  // первичная синхронизация
  run()

  const mo = new MutationObserver(muts => {
    const touched = muts.some(
      m => m.type === 'attributes' && m.attributeName === 'data-fragment'
    )
    if (!touched) return
    run()
  })
  mo.observe(section, { attributes: true, attributeFilter: ['data-fragment'] })
  return () => mo.disconnect()
}