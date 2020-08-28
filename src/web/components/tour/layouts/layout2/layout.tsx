import styled from '#veewme/web/common/styled-components'
import React, { FunctionComponent } from 'react'
import { Tour } from '../../types'

const Wrapper = styled.div`
  background: ${props => props.theme.colors.GREEN};
  padding: 10px;

  div {
    padding: 20px 0;
  }
`

interface LayoutProps {
  tour: Tour
}

const Layout: FunctionComponent<LayoutProps> = props => {
  return (
    <Wrapper>
      Test Tour using Layout 2
      <div>Address: {props.tour.address}</div>
    </Wrapper>
  )
}
export default Layout
