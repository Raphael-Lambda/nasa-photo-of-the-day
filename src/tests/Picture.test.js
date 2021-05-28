import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Picture from '../components/Picture'
import styled from 'styled-components'


/* 
=============================
styled Components
=============================
*/
const Explanation = styled.p`
    font-weight: 500;
    font-size 18px;
    text-align: justify;
    line-height: 22px;
    letter-spacing 3px;
`
const ImageContainer= styled.div`
    position: relative;
`
const Arrow= styled.div`
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 30px;
    font-size: 50px;
    opacity: .3;
    top: 50%;
    ${props => props.type === 'right'? "right: 5px": "left: 5px"};
    &:hover{
        opacity: 1;
    }
`
const PictureStyle = styled.img`
    width: 90%;
    height: 90%;
`
const Frame = styled.iframe`
    width: 90%;
    height: 90%;
`
const ImageTitle = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    font-variant: small-caps;
    &p{
        font-family: ${props => props.theme.fontFamily.codeSnippetStyle};
    }
`


/* 
=============================
Test
=============================
*/

test('renders content', () => {
    const MockHandler = jest.fn();
    const picture = {
        dayPlusOne: MockHandler,
        dayMinusOne: MockHandler,
        selectedDate: Date.now(),
        searchResult: true,
  }

  const component = render(
    <Picture picture={picture} />
  )

  expect(component.container).toHaveTextContent(
    <>
        <ImageTitle>
            <h2>{POTD.title}</h2>
            <p>{POTD.date}</p>
        </ImageTitle>
        <ImageContainer>
            {POTD.date !== (new Date(todayEastern).toISOString().slice(0,10)) && <Arrow type="right" onClick={() => {dayPlusOne()}}>&gt;</Arrow>}
            {POTD.media_type === "video"?<Frame src={POTD.url} title={POTD.title}></Frame>:<PictureStyle src={POTD.url} alt={POTD.title}></PictureStyle>}
            <Arrow onClick={() => {dayMinusOne()}}>&lt;</Arrow>
        </ImageContainer>
        <Explanation>{POTD.explanation}</Explanation>
        </>
  )
})