import { Role } from '#veewme/gen/graphqlTypes'
import * as React from 'react'
import { NavHashLink } from '../../../../common/hashLink'
import SecondaryNavigation from '../../../../common/secondaryNavigation'

export default (props: {role: Role}) => {
  const onAffiliateAccount = props.role === 'AFFILIATE'
  return (
    <SecondaryNavigation>
      <li><NavHashLink to='#account'>Account</NavHashLink></li>
      <li><NavHashLink to='#brokerage'>Brokerage</NavHashLink></li>
      <li><NavHashLink to='#address'>Address</NavHashLink></li>
      <li><NavHashLink to='#propertySiteMediaShowcase'>Property Site / Tour Gallery</NavHashLink></li>
      {onAffiliateAccount && <li><NavHashLink to='#notifications'>Notifications</NavHashLink></li>}
      <li><NavHashLink to='#syndication'>Syndication</NavHashLink></li>
      <li><NavHashLink to='#defaultColorScheme'>Color scheme</NavHashLink></li>
      <li><NavHashLink to='#siteTourSettings'>Property Site / Tour Settings</NavHashLink></li>
      {onAffiliateAccount && <li><NavHashLink to='#pluginTracking'>Plugin / Tracking</NavHashLink></li>}
      {onAffiliateAccount && <li><NavHashLink to='#propertyFlyerLayout'>Property Flyer Layout</NavHashLink></li>}
      <li><NavHashLink to='#socialMedia'>Social media</NavHashLink></li>
    </SecondaryNavigation>
  )
}
