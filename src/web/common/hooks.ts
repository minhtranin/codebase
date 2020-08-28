import * as mediaBreakpoints from '#veewme/web/common/mediaBreakpoints'
import { getPixels } from '#veewme/web/common/util'
import * as React from 'react'

const breakpoint = getPixels(mediaBreakpoints.BREAKPOINT_XL)

export const useIsDesktopView = () => {
  const [desktopView, setDesktopView] = React.useState(window.innerWidth >= breakpoint)
  const eventListener = () => setDesktopView(window.innerWidth >= breakpoint)

  React.useEffect(() => {
    window.addEventListener('resize', eventListener)
    return () => {
      window.removeEventListener('resize', eventListener)
    }
  }, [])

  return [desktopView]
}
