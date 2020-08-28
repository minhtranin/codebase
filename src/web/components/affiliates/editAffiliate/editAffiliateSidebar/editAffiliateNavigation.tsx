import * as React from 'react'
import { NavHashLink } from '../../../../common/hashLink'
import SecondaryNavigation from '../../../../common/secondaryNavigation'

const EditAffiliateNavigation: React.FunctionComponent<{}> = () => {
  return (
    <SecondaryNavigation>
      <li><NavHashLink to='#company'>Company</NavHashLink></li>
      <li><NavHashLink to='#contact'>Contact</NavHashLink></li>
      <li><NavHashLink to='#billing'>Billing</NavHashLink></li>
      <li><NavHashLink to='#gallery'>Gallery</NavHashLink></li>
      <li><NavHashLink to='#links'>Links</NavHashLink></li>
      <li><NavHashLink to='#settings'>Settings</NavHashLink></li>
      <li><NavHashLink to='#photoExport'>Photo export</NavHashLink></li>
      <li><NavHashLink to='#syndication'>Syndication</NavHashLink></li>
      <li><NavHashLink to='#whiteLabel'>White Label</NavHashLink></li>
      <li><NavHashLink to='#plugin'>Plugins</NavHashLink></li>
      <li><NavHashLink to='#socialMedia'>Social media</NavHashLink></li>
    </SecondaryNavigation>
  )
}

export default EditAffiliateNavigation
