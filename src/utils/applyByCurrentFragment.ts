export function applyByCurrentFragment(section: HTMLElement) {
  const codes = Array.from(section.querySelectorAll('code')) as HTMLElement[]
  if (!codes.length) return

  const active = codes.filter(c => c.classList.contains('current-fragment'))
  if (active.length > 0) {
    codes.forEach(c => {
      if (active.includes(c)) {
        c.style.display = 'block'
        c.style.position = 'relative'
      } else {
        c.style.display = 'none'
      }
    })
  } else {
    const base =
      (section.querySelector('code:not(.fragment)') as HTMLElement) || codes
    codes.forEach(c => {
      if (c === base) {
        c.style.display = 'block'
        c.style.position = 'relative'
      } else {
        c.style.display = 'none'
      }
    })
  }
}