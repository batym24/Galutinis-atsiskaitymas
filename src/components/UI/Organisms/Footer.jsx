import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    border-top: 1px solid gray;
    background-color: white;


    h3 {
        font-style: italic;
        color: gray;
    }
`

const Footer = () => {
    return ( 
        <StyledFooter>
            <h3>QuestionAir(e)© 2023. All rights reserved.</h3>
        </StyledFooter>
     );
}
 
export default Footer;