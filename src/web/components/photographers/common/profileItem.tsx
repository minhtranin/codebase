// import { privateUrls } from '#veewme/lib/urls'
import * as log from '#veewme/web/common/log'
import { ImageWrapper, MailIcon, PersonBox, StyledDropDownButton } from '#veewme/web/common/styled-listItem'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Avatar from '../../../assets/svg/male-user.svg'
import PinSvg from '../../../assets/svg/pin.svg'
import { DropDownListGroups } from '../../../common/dropDownList'
import { StyledLinkButton } from '../../../common/styled'
import styled from '../../../common/styled-components'
import { StyledCell, StyledRow } from '../styled'
import { BooleanIcon } from './buttons'
import { Profile } from './types'

// Styled components
const PinIcon = styled(PinSvg)`
  width: 15px;
  height: 15px;
  fill: ${props => props.theme.colors.BUTTON_BORDER};
  cursor: pointer;
  transition: fill .5s;

  &:hover {
    fill: ${props => props.theme.colors.ORANGE};
  }
`

const PhoneWrapper = styled.span`
  white-space: nowrap;
`

interface PhotographerItemProps extends RouteComponentProps {
  profile: Profile
  onPinClick: (id: Profile['id']) => void
  onDelete: (id: Profile['id']) => void
  role?: 'Processor' | 'Photographer'
}

const PhotographerItem: React.FunctionComponent<PhotographerItemProps> = ({
  match,
  profile,
  onDelete,
  onPinClick,
  role
}) => {
  const currentUrl = match.url
  const actionOptions: DropDownListGroups = [{
    items: [{
      label: 'Edit',
      linkTo: `${currentUrl}/edit/${profile.id}`
    }, {
      label: 'Suspend',
      onClick: () => log.debug(`Suspend clicked ${profile.id}`)
    }, {
      label: 'Delete',
      onClick: () => onDelete(profile.id)
    }]
  }]

  return (
    <StyledRow>
      <StyledCell>
        <PersonBox>
          <div>
            {role === 'Photographer' && <ImageWrapper>
                {profile.thumb ? <img src={profile.thumb} alt='Photographer' /> : <Avatar width='40' height='40' />}
              </ImageWrapper>
            }
            <span>{`${profile.user.firstName} ${profile.user.lastName}`}</span>
          </div>
          <div>
            <a href='mailto: #'><MailIcon /></a>
            <span onClick={() => onPinClick(profile.id)}>
              <PinIcon />
            </span>
          </div>
        </PersonBox>
      </StyledCell>
      <StyledCell>
        <PhoneWrapper>{profile.phone}</PhoneWrapper>
      </StyledCell>
      <StyledCell>
        {profile.city || '-'}
      </StyledCell>
      <StyledCell>
        {profile.region ? profile.region.label : '-'}
      </StyledCell>
      <StyledCell>
        <BooleanIcon value={!!profile.activatable} />
      </StyledCell>
      {
        role === 'Photographer' && <StyledCell>
          <BooleanIcon value={!!profile.schedulable} />
        </StyledCell>
      }
      <StyledCell darker center>
        <StyledLinkButton to='#'>
          Orders
        </StyledLinkButton>
      </StyledCell>
      <StyledCell darker>
        <StyledDropDownButton list={actionOptions} />
      </StyledCell>
    </StyledRow>
  )
}

export default withRouter(PhotographerItem)
