import { UnreachableCaseError } from '#veewme/lib/error'
import * as React from 'react'
import { VideoTypes } from '../types'
import AddEmbedVideo from './addEmbedVideo'
import AddFauxVideo from './addFauxVideo'
import AddHostedVideo from './addHostedVideo'
import AddUrlVideo from './addUrlVideo'

interface Step2Props {
  selectedType: VideoTypes
  onSubmitSuccess: () => void
}

// Just temp version of component.
class Step2 extends React.PureComponent<Step2Props> {
  render () {
    const { selectedType, onSubmitSuccess } = this.props
    // TODO: chose component to render (string -> JSX.Element)
    let contentToShow: string | JSX.Element
    switch (selectedType) {
      case 'URL':
        contentToShow = <AddUrlVideo />
        break
      case 'faux':
        contentToShow = <AddFauxVideo onSubmitSuccess={onSubmitSuccess} />
        break
      case 'embed':
        contentToShow = <AddEmbedVideo />
        break
      case 'hosted':
        contentToShow = <AddHostedVideo onSubmitSuccess={onSubmitSuccess} />
        break
      default:
        throw new UnreachableCaseError(selectedType)
    }
    return (
      <>
        {contentToShow}
      </>
    )
  }
}

export default Step2
