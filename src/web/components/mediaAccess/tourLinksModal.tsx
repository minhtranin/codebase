import Button from '#veewme/web/common/buttons/basicButton'
import * as log from '#veewme/web/common/log'
import Modal from '#veewme/web/common/modal'
import styled from '#veewme/web/common/styled-components'
import copy from 'copy-to-clipboard'
import * as React from 'react'

import { MailOutline as Mail } from 'styled-icons/material'

const ModalContent = styled.div`
  position: relative;
  width: 700px;
  max-width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_XXL}) {
    width: 840px;
  }
`

const ModalLink = styled.div``

const LinkLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.theme.colors.FIELD_TEXT};
  margin: 17px 0 10px 0;
`

const UrlHolder = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  color: ${props => props.theme.colors.LABEL_TEXT};

  span {
    padding: 3px 15px;
    border-radius: 5px;
    border: 2px solid ${props => props.theme.colors.BORDER};
    flex: 1 0 auto;
    line-height: 22px;
  }
`

const Buttons = styled.div`
  width: 130px;
  margin-left: -130px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    flex: 0 0 100px;
    margin: -1px;
    border-color: ${props => props.theme.colors.GREEN};
  }

  svg {
    fill: ${props => props.theme.colors.GREEN};
    transition: opacity .5s;

    &:hover {
      opacity: 0.8;
    }
  }
`

interface TourLink {
  label: string
  url: string
}

const tourLinks: TourLink[] = [{
  label: 'Branded Link',
  url: 'http://www.example.com/branded'
}, {
  label: 'Unbranded Link',
  url: 'http://www.example.com/unbranded'
}, {
  label: 'MLS Link (Hidden Address)',
  url: 'http://www.example.com/msl'
}, {
  label: 'Public Preview Link',
  url: 'http://www.example.com/public'
}]

interface TourLinkProps {
  link: TourLink
}

const TourLink: React.FunctionComponent<TourLinkProps> = props => {
  const body = encodeURIComponent(`${props.link.label}: ${props.link.url}`)
  const subject = encodeURIComponent(props.link.label)
  const href = `mailto:?subject=${subject}&body=${body}`
  const timer = React.useRef<number>()
  log.debug('Decoded mailto href: ', decodeURIComponent(href))

  const handleCopy = () => {
    copy(props.link.url)
    setCopied(true)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const [copied, setCopied] = React.useState(false)

  return (
    <ModalLink>
      <LinkLabel>
        {props.link.label}
      </LinkLabel>
      <UrlHolder>
        <span>{props.link.url}</span>
        <Buttons>
          <a
            href={href}
          >
            <Mail size={22} />
          </a>
          <Button
            buttonTheme={copied ? 'primary' : 'action'}
            full={copied}
            size='medium'
            label={copied ? 'Copied' : 'Copy'}
            onClick={handleCopy}
          />
        </Buttons>
      </UrlHolder>
    </ModalLink>
  )
}

interface TourLinksModalProps {
  isOpen: boolean
  close: () => void
}

const TourLinksModal: React.FunctionComponent<TourLinksModalProps> = props => {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.close} title='Tour links'>
      <ModalContent>
        {tourLinks.map((link, i) => <TourLink key={i} link={link} />)}
      </ModalContent>
    </Modal>
  )
}

export default TourLinksModal
