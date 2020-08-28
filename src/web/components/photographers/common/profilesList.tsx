// import * as log from '#veewme/web/common/log'
import Pagination, { PaginationProps } from '#veewme/web/common/footer/pagination'
import ListHeaderItem from '#veewme/web/common/listHeaderItem'
import * as React from 'react'
import { StyledHeaderCell, StyledTable } from '../styled'
import ProfileItem from './profileItem'
import { Profile } from './types'

interface ProfilesListViewProps {
  profiles: Profile[]
  onPinClick: (id: Profile['id']) => void
  onDelete: (id: Profile['id']) => void
  onSortClick: () => void
  isSortReverse: boolean
  role?: 'Processor' | 'Photographer'
}

const ProfilesListView: React.FunctionComponent<ProfilesListViewProps & PaginationProps> = ({
  role = 'Photographer',
  ...props
}) => (
  <>
    <StyledTable>
      <tbody>
        <tr>
          <StyledHeaderCell>
            <ListHeaderItem
              label={role}
              active
              reverseSort={props.isSortReverse}
              onSort={props.onSortClick}
            />
          </StyledHeaderCell>
          <StyledHeaderCell>
            <ListHeaderItem label='Phone' />
          </StyledHeaderCell>
          <StyledHeaderCell>
            <ListHeaderItem label='City' />
          </StyledHeaderCell>
          <StyledHeaderCell>
            <ListHeaderItem label='Region' />
          </StyledHeaderCell>
          <StyledHeaderCell>
            <ListHeaderItem label='Can activate?' />
          </StyledHeaderCell>
          {
            role === 'Photographer' && <StyledHeaderCell>
              <ListHeaderItem label='Can schedule?' />
            </StyledHeaderCell>
          }
        </tr>
        {props.profiles.map(profile => (
          <ProfileItem
            key={profile.id}
            profile={profile}
            onPinClick={props.onPinClick}
            onDelete={props.onDelete}
            role={role}
          />
        ))}
      </tbody>
    </StyledTable>
    <Pagination
      onPageChange={props.onPageChange}
      pageLimit={props.pageLimit}
      totalRecords={props.totalRecords}
    />
  </>
)

export default ProfilesListView
