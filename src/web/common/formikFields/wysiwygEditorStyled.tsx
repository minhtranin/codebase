import { buttonStyle } from '../buttons/basicButton'
import styled, { css } from '../styled-components'

const linkStyle = css`
  position: absolute;
  box-sizing: border-box;
  right: -24px;
  top: 36px;
  background-color: white;
  display: flex;
  border: 2px solid ${props => props.theme.colors.BORDER};
  z-index: 1;
  &:before {
    content: '';
    display: block;
    z-index: 3;
    background-color: white;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
    border-left: 2px solid ${props => props.theme.colors.BORDER};
    border-top: 2px solid ${props => props.theme.colors.BORDER};
    position: absolute;
    right: 30px;
    top: -7px;
  }
`

const optionsGroupWrapper = css`
  display: flex;
  border-right: 1px solid ${props => props.theme.colors.BORDER};
  position: relative;
`

const toolbarOption = css`
  width: 30px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const linkModal = css`
  ${linkStyle}
  flex-direction: column;
  justify-content: left;
  align-items: baseline;
  padding: 20px;
  width: 244px;
  height: auto;
`

const dropdownWrapper = css`
  position: relative;
  ul.rdw-dropdown-optionwrapper {
    ${linkStyle}
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height:30px;
      z-index: 2;
      background-color: white;
    }
  }
`

const linkTextInput = css`
  width: 100%;
  border: 2px solid${props => props.theme.colors.BORDER};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px 10px;
  margin-bottom: 5px;
  height: 32px;
  font-size: 13px;
  &:focus {
    border-color: ${props => props.theme.colors.GREEN};
    outline: none;
  }
`

const targetCheckbox = css`
  #openLinkInNewWindow[type='checkbox']  {
    display: none;
    & + span {
      margin-top: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    & + span:before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      outline: 1px solid ${props => props.theme.colors.BORDER};
      margin-right: 10px;
      background-color: white;
      box-sizing: border-box;
      cursor: pointer;
    }
    &:checked + span:before {
      background-color: ${props => props.theme.colors.GREEN};
      border: 3px solid white;
    }
  }
`

const buttonSection = css`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  width: 100%;
  margin-top: 5px;
`

const editorMain = css`
  border-top:  2px solid ${props => props.theme.colors.BORDER};
  color: ${props => props.theme.colors.FIELD_TEXT};
  cursor: text;
  font-size: 13px;
`

const editorContent = css`
  min-height: 120px;
  padding: 10px 15px;
`

const WysiwygContainer = styled.div < { focus: boolean } > `
  margin: 0 0 15px;
  label {
    font-size: 13px;
    color: ${props => props.theme.colors.LABEL_TEXT};
    margin-bottom:10px;
    display:block;
  }
  .rdw-editor-wrapper {
    border: 2px solid;
    border-color: ${props => props.focus ? props.theme.colors.GREEN : props.theme.colors.BORDER};
    border-radius: 5px;
    background-color: white;
    .rdw-editor-toolbar {
      display: flex;
      padding: 5px 0;
      width: 100%;
      & > div {
        ${optionsGroupWrapper}
        .rdw-option-wrapper, .rdw-dropdown-wrapper {
          ${toolbarOption}
          img {opacity: 0.5}
          &:hover img, &.rdw-option-active img {opacity:1}
          &.rdw-option-disabled img {opacity: 0.15}
        }
        .rdw-link-modal {
          ${linkModal}
          input:not([type='checkbox']) { ${linkTextInput} }
          .rdw-link-modal-target-option { ${targetCheckbox} }
          .rdw-link-modal-buttonsection {
            ${buttonSection}
            .rdw-link-modal-btn:first-child {
              ${props => buttonStyle({ buttonTheme: 'action', full: true, size: 'small', theme: props.theme })}
            }
            .rdw-link-modal-btn:last-child {
              ${props => buttonStyle({ buttonTheme: 'alert', size: 'small', theme: props.theme })}
            }
          }
        }
        .rdw-dropdown-wrapper { ${dropdownWrapper} }
      }
    }
    .rdw-editor-main {
      ${editorMain}
      .public-DraftEditor-content {
        ${editorContent}
      }
      a, a span[data-text='true'] {
        color: ${props => props.theme.colors.GREEN};
        cursor: pointer;
        &:hover {text-decoration: underline}
      }
      .rdw-link-decorator-wrapper > img {display: none}
      .rdw-decorator-icon {
        display: none;
      }
      ul, ol {
        padding-left: 30px;
        margin: 20px 0;
      }
      ul {list-style: unset}
      div[data-block='true'] {margin: 20px 0;}
      div[data-block='true']:first-child {margin-top: 0;}
    }
  }
`

export default WysiwygContainer
