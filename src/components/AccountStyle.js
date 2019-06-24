import styled from 'styled-components';

const Account = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    flex-direction: column;
    background: #4e54c8; 
    background: -webkit-linear-gradient(to right, #8f94fb, #4e54c8);  
    background: linear-gradient(to right, #8f94fb, #4e54c8); 
    min-height: 300px;
    box-shadow: none;
    transition: all 200ms ease;

    & > span > span {
        color: #fff;
    }
    & > span {
        color: #fff;
        margin: 10px 0;
        &:nth-child(2) {
            font-weight: bold;
            font-size: 40pt;
        }
    }
`

export default Account;