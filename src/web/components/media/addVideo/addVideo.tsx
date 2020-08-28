import { privateUrls } from '#veewme/lib/urls'
import { BreadcrumbNavigation } from '#veewme/web/common/breadcrumbs/breadcrumbNavigation'
import * as Grid from '#veewme/web/common/grid'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { VideoTypes } from '../types'
import Step1 from './step1'
import Step2 from './step2'

const StyledGridLeftAside = styled(Grid.LeftAside) `
  & > nav {
    @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) and (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XXL}) {
      & > div:first-child > div:first-child > div:first-child {display: flex;}
    }
  }
`

const Heading = styled(Grid.Heading)`
  button {
    display: none;
  }
`

interface AddVideoProps extends RouteComponentProps<{ orderId: string }> {

}

interface AddVideoState {
  selectedType?: VideoTypes
}

/*
  Depending on selected video type different form will be rendered in step 2.
  Each step 2 form have to be separate form component including only necessary fields and submit button.
  Because of this 'step 2 footer' with submit button have to be put directly in step 2 content.
  Rendering it as BreadcrumbNavigation.Provider 'footers' would make submission imposssible in this case because submit button
  would be outside form.
*/
class AddVideo extends React.PureComponent<AddVideoProps, AddVideoState> {
  state: AddVideoState = {}

  handleVideoTypeClick = (selectedType: VideoTypes) => {
    this.setState({
      selectedType
    })
  }

  handleSubmitSuccess = () => {
    const { match: { params: { orderId } } } = this.props

    // because BreadcrumbNavigation is wrapped in Memory Router to navigate outside this router routes (outside multi step form)
    // we need access to history object from main app Router.
    // Wrapping any nested component in withRouter wouldn't work because Memory Router history object would be used
    this.props.history.push(`${privateUrls.orders}/order/${orderId}/media/video`)
  }

  clearVideoSelection = () => {
    this.setState({
      selectedType: undefined
    })
  }

  render () {
    const steps = [
      {
        label: 'Type of Video',
        render: () => (
          <Step1
            selectedType={this.state.selectedType}
            onClick={this.handleVideoTypeClick}
            clearSelection={this.clearVideoSelection}
          />
        )
      },
      {
        label: 'Video Details',
        render: () => (
          this.state.selectedType ?
            <Step2 onSubmitSuccess={this.handleSubmitSuccess} selectedType={this.state.selectedType} />
            : 'Please select video type in Step 1'
        )
      }
    ]

    return (
      <BreadcrumbNavigation.Provider steps={steps} >
        <Grid.Wrapper>
          <Heading>
            <h1>Add New Video</h1>
          </Heading>
          <StyledGridLeftAside>
            <BreadcrumbNavigation.Breadcrumbs />
          </StyledGridLeftAside>
          <Grid.MainColumn>
            <BreadcrumbNavigation.SelectedStep />
          </Grid.MainColumn>
          <Grid.FooterContainer>
            <BreadcrumbNavigation.SelectedFooter />
          </Grid.FooterContainer>
        </Grid.Wrapper>
      </BreadcrumbNavigation.Provider>
    )
  }
}

export default withRouter(AddVideo)
