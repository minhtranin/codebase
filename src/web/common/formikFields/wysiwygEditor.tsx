import { FieldProps } from 'formik'
import * as React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import WysiwygContainer from './wysiwygEditorStyled'

interface WysiwygEditorState {
  focus: boolean
}

interface CustomEditorProps {
  name: string
  label: string
  className?: string
  toolbarCustomButtons: JSX.Element[]
}

type WysiwygEditorProps = CustomEditorProps & FieldProps

class WysiwygEditor extends React.PureComponent<WysiwygEditorProps, WysiwygEditorState> {
  static defaultProps = {
    toolbarCustomButtons: []
  }

  constructor (props: WysiwygEditorProps) {
    super(props)
    this.state = {
      focus: false
    }
  }

  render () {
    return (
      <WysiwygContainer id={this.props.field.name} focus={this.state.focus} className={this.props.className}>
        <label>{this.props.label}</label>
        <Editor
          editorState={this.props.field.value}
          onEditorStateChange={editorState => {
            this.props.form.setFieldValue(this.props.field.name, editorState)
            this.props.form.setFieldTouched(this.props.field.name)
          }}
          toolbar={{
            history: { inDropdown: false },
            inline: {
              inDropdown: false,
              options: ['bold', 'italic', 'underline']
            },
            link: { inDropdown: true },
            list: {
              inDropdown: false,
              options: ['unordered', 'ordered']
            },
            options: [
              'history',
              'inline',
              'list',
              'link'
            ]
          }}
          onFocus={() => { this.setState({ focus: true }) }}
          onBlur={() => { this.setState({ focus: false }) }}
          toolbarCustomButtons={this.props.toolbarCustomButtons}
          stripPastedStyles
        />
      </WysiwygContainer>
    )
  }
}

export default WysiwygEditor
