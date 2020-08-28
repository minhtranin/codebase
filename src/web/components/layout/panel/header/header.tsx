import { Account } from '#veewme/graphql/types'
import { privateUrls, publicUrls } from '#veewme/lib/urls'
import AvatarSvg from '#veewme/web/assets/svg/male-user.svg'
import ReportsSvg from '#veewme/web/assets/svg/reports.svg'
import { DropDownListGroups } from '#veewme/web/common/dropDownList'
import * as log from '#veewme/web/common/log'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { HEADER_HEIGHT_PX, SIDEBAR_WIDTH_PX } from '../constants'
import HeaderDropDown from './headerDropDown'
import { Logo } from './logo'

const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  height: ${HEADER_HEIGHT_PX}px;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.HEADER_BACKGROUND};
  border-bottom: 2px solid ${props => props.theme.colors.HEADER_BORDER};
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoContainer = styled.div `
  margin-left: ${SIDEBAR_WIDTH_PX}px;
`

const ButtonsContainer = styled.div `
  margin: 0;
  padding: 0 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
`

const Label = styled.h3 `
  margin: 0 10px;
  font-weight: 500;
  font-size: 13px;
`

const SubLabel = styled.h4 `
  margin: 0 10px;
  font-weight: 400;
  font-size: 12px;
  color: ${props => props.theme.colors.LABEL_TEXT};
  text-transform: capitalize;
`

const UserInfoWrapper = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 15em;
`

interface UserInfoProps {
  me: Account
}

const UserInfo: React.FunctionComponent<UserInfoProps> = props => (
  <>
    <Label>{props.me.firstName} {props.me.lastName}</Label>
    <SubLabel>{props.me.role.toLowerCase()}</SubLabel>
  </>
)

const reportList: DropDownListGroups = [
  {
    items: [
      {
        label: 'Report 1',
        onClick: () => log.debug(`Option 1 clicked`)
      },
      {
        label: 'Report 2',
        onClick: () => log.debug(`Option 2 clicked`)
      },
      {
        label: 'Report 3',
        onClick: () => log.debug(`Option 3 clicked`)
      },
      {
        label: 'Report 4',
        onClick: () => log.debug(`Option 4 clicked`)
      }
    ]
  }
]

const userList: DropDownListGroups = [
  {
    items: [
      {
        label: 'Account...',
        linkTo: privateUrls.account
      },
      {
        label: 'Users',
        linkTo: privateUrls.employees,
        visibleByRoles: ['AFFILIATE']
      },
      {
        label: 'Billing',
        onClick: () => log.debug(`Option 2 clicked`)
      },
      {
        label: 'My Support Page',
        onClick: () => log.debug(`Option 3 clicked`)
      },
      {
        label: 'Data Export',
        onClick: () => log.debug(`Option 4 clicked`)
      },
      {
        label: 'Changelog',
        onClick: () => log.debug(`Option 5 clicked`)
      }
    ]
  },
  {
    items: [{
      label: 'Log out',
      linkTo: publicUrls.logout
    }]
  }
]

interface HeaderProps {
  me?: Account
}

const Header: React.FunctionComponent<HeaderProps> = props => (
  <Wrapper>
    <LogoContainer>
      <Logo/>
    </LogoContainer>
    <ButtonsContainer>
      {props.me &&
        <>
          <HeaderDropDown
            list={reportList}
            icon={ReportsSvg}
          >
            <Label>Jobs Reports...</Label>
          </HeaderDropDown>
          <HeaderDropDown
            list={userList}
            icon={AvatarSvg}
            role={props.me.role}
          >
            <UserInfoWrapper>
              <UserInfo me={props.me}/>
            </UserInfoWrapper>
          </HeaderDropDown>
        </>
      }
    </ButtonsContainer>
  </Wrapper>
)

export default Header
