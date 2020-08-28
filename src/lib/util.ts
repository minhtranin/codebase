import { convertToRaw, EditorState, RawDraftContentState } from 'draft-js'

export const nameof = <T>(name: keyof T) => name

export function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const prepareEditorValueForStorage
: (editorState?: EditorState) => RawDraftContentState | undefined = editorState => {
  if (!editorState) {
    return
  }
  const rawContent = convertToRaw(editorState.getCurrentContent())
  if (rawContent.blocks.findIndex(block => block.text.length > 0) >= 0) {
    return rawContent
  }
  return
}

export const getRandomArrayItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
