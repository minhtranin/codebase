import * as React from 'react'
import { NavHashLink } from '../../../common/hashLink'
import SecondaryNavigation from '../../../common/secondaryNavigation'

export default () => {
  return (
    <SecondaryNavigation>
      <li><NavHashLink to='#addBrokerage'>Brokerage</NavHashLink></li>
      <li><NavHashLink to='#address'>Address</NavHashLink></li>
      <li><NavHashLink to='#propertySiteMediaShowcase'>Property Site / Media Showcase</NavHashLink></li>
      <li><NavHashLink to='#photoDownloadPresets'>Photo Download Presets</NavHashLink></li>
      <li><NavHashLink to='#defaultColorScheme'>Color scheme</NavHashLink></li>
      <li><NavHashLink to='#propertyFlyerLayout'>Property Flyer Layout</NavHashLink></li>
      <li><NavHashLink to='#syndication'>Syndication</NavHashLink></li>
    </SecondaryNavigation>
  )
}
