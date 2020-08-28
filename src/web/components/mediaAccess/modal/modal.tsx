import Modal from '#veewme/web/common/modal'
import styled from '#veewme/web/common/styled-components'
import TabsBar from '#veewme/web/common/tabsBar'
import * as React from 'react'
import { MemoryRouter, Route } from 'react-router'
import Documents from './documents'
import Flyers from './flyer'
import Interactives from './interactive'
import Photos from './photos'
import Videos from './videos'

const ModalContent = styled.div`
  position: relative;

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    width: 760px;
  }

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    width: 980px;
  }
`

const Tabs = styled(TabsBar)`
  margin: -20px 0 20px 0;

  a {
    text-transform: capitalize;
  }
`
export enum TabItems {
  Photos = 'photos',
  Videos = 'videos',
  Interactive = 'interactive',
  Documents = 'documents',
  Flyer = 'flyer'
}

// casting because Object.values doesn't preserve type for string enums
// https://github.com/Microsoft/TypeScript/pull/12253
export const tabEntries = Object.values(TabItems) as TabItems[]
const tabs = tabEntries.map(entry => ({
  label: entry,
  to: entry
}))

interface MediaModalProps {
  isOpen: boolean
  close: () => void
  title: string
  currentTab: TabItems
}

const MediaModal: React.FunctionComponent<MediaModalProps> = props => {
  const currentTabIndex = tabEntries.findIndex(entry => entry === props.currentTab)
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.close} title={props.title}>
      <MemoryRouter
        initialEntries={tabEntries}
        initialIndex={currentTabIndex}
      >
        <ModalContent>
          <Tabs
            tabs={tabs}
          />
          {/* Local memory routing is used here so no need to move these  urls to 'lib/urls' */}
          <Route exact path={TabItems.Photos} component={Photos} />
          <Route path={TabItems.Videos} component={Videos} />
          <Route path={TabItems.Interactive} component={Interactives} />
          <Route path={TabItems.Documents} component={Documents} />
          <Route path={TabItems.Flyer} component={Flyers} />
        </ModalContent>
      </MemoryRouter>
    </Modal>
  )
}

export default MediaModal
