import styled from 'styled-components';

const Tag = styled.div`
    display: inline-block;
    line-height: 1;
    vertical-align: baseline;
    margin: 0 .14285714em;
    background-color: ${props => props.bgColor};
    background-image: none;
    padding: .5833em .833em;
    color:  ${props => props.color};
    text-transform: none;
    font-weight: 700;
    border: 0 solid transparent;
    border-radius: .28571429rem;
`

export default Tag;