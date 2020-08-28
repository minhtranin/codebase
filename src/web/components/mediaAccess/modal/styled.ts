import styled from '#veewme/web/common/styled-components'

export const IconButtons = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  button {
    margin-right: 8px;
    background: #fff;
    padding: 10px;
    width: 35px;
    height: 35px;
    border: 2px solid ${props => props.theme.colors.BORDER};
    border-radius: 5px;
    transition: opacity .5s;

    &:hover {
      opacity: 0.9;
    }

    &:last-child {
      margin-right: 0;
    }

    svg {
      fill: ${props => props.theme.colors.GREEN};
      width: 25px;
      height: 25px;
    }
  }
`

export const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  margin-top: 5px;
  color: ${props => props.theme.colors.LABEL_TEXT};
`

export const BottomHolder = styled.div`
  height: 75px;
  flex: 0 0 auto;
  padding: 15px;
  background: #fff;
`

export const DownloadLink = styled.a`
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colors.FIELD_TEXT};

  &:hover {
    svg {
      fill: ${props => props.theme.colors.LABEL_TEXT};
    }
  }

  svg {
    fill: ${props => props.theme.colors.GREEN};
    transition: fill .5s;
  }
`
