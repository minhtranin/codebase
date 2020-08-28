import { MeQuery } from '#veewme/graphql/types'
import { Me } from '#veewme/lib/graphql/queries'
import { publicUrls } from '#veewme/lib/urls'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import styled from '../../common/styled-components'
import { HEADER_HEIGHT_PX, SIDEBAR_WIDTH_PX } from './panel/constants'
import Header from './panel/header/header'
import Sidebar from './panel/sidebar/sidebar'
import PublicPageWrapper from './publicPage/publicPage'

const Main = styled.section`
  display: flex;
  min-height: calc(100vh - ${HEADER_HEIGHT_PX}px);
  margin-top: ${HEADER_HEIGHT_PX}px;
  margin-left: ${SIDEBAR_WIDTH_PX}px;
  bottom: 0;
  min-width: 470px;
  background-color: ${props => props.theme.colors.BACKGROUND};
  @media (max-width: 1024px) {
    margin-left: 0;
  }
`

export const PrivatePage: React.ComponentClass = withRouter(props => {
  const { data, loading } = useQuery<MeQuery>(Me, {
    fetchPolicy: 'network-only',
    onError: () => props.history.push(publicUrls.login)
  })

  return (
    <>
      <Header me={data && data.me}/>
      <Sidebar role={data && data.me.role} />
      <Main>
        <DotSpinnerModal isOpen={loading} />
        {data && data.me && !loading && props.children}
      </Main>
    </>
  )
})

export const PublicPage: React.FunctionComponent = props => (
  <PublicPageWrapper>
    {props.children}
  </PublicPageWrapper>
)
