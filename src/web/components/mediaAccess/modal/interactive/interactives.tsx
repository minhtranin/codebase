import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import TabContainer from '../tabContainer'
import Item, { InteractiveItemData } from './interactiveItem'

/*
 Fake data
 TODO: remove when integrdated with backend
*/
const mockOrderInteractives: InteractiveItemData[] = [{
  embeddedCode: '<iframe src="" />',
  id: '1',
  title: 'Interactive Item',
  url: 'http://2.veewme.com'
}, {
  embeddedCode: '<iframe src="" />',
  id: '2',
  title: 'Lorem Ipsum',
  url: 'http://2.veewme.com'
}, {
  embeddedCode: '<iframe src="" />',
  id: '3',
  title: 'Item #1',
  url: 'http://2.veewme.com'
}, {
  embeddedCode: '<iframe src="" />',
  id: '4',
  title: 'Interactive #3',
  url: 'http://2.veewme.com'
}]

const InteractiveWrapper = styled.div`
  margin: -10px 15px 0 0;
`

interface InteractiveListProps {
  interactives: InteractiveItemData[]
}

const InteractiveList: React.FunctionComponent<InteractiveListProps> = props => (
  <Scrollbars
    autoHeight={true}
    autoHeightMax={`calc(85vh - 245px)`}
    autoHide={false}
    autoHeightMin='250px'
  >
    <InteractiveWrapper>
      {props.interactives.map(interactive => <Item key={interactive.id} interactive={interactive} />)}
    </InteractiveWrapper>
  </Scrollbars>
)

interface InteractiveContainerProps {
  orderId?: string
}

const InteractiveContainer: React.FunctionComponent<InteractiveContainerProps> = () => (
  <TabContainer>
    <InteractiveList interactives={mockOrderInteractives} />
  </TabContainer>
)

export default InteractiveContainer
