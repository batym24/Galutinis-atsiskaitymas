import styled from "styled-components";

const StyledMain = styled.main`
    display: flex;
    height: calc(100vh - 100px);
    background-color: #f1f2f3;
    .main-container {
        display: flex;
        flex-direction: column;
        width: 90vw;
        margin: 20px auto;
        border: 3px solid gray;
        background-color: white;

        .header-filter {
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid gray;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h1 {
                margin: 30px 100px;
                font-weight: 300;
            }

            button {
                margin: 20px 50px;
                background-color: #0a95ff;
                color: white;
                border: none;
                border-top: 1px solid #6cc0ff;
                cursor: pointer;
                padding: 10px 30px;
                border-radius: 3px;
                font-size: 0.9rem;
            }

            button:hover {
            background-color: #056fc0;
        }


        }

        .filter{
            display: flex;
            justify-content: flex-end;
            margin: 20px 50px;
        }
    }
`

const Home = () => {
    return ( 
        <StyledMain>
            <div className="main-container">
                <div className="header-filter">
                    <div className="header">
                        <h1>All Questions</h1>
                        <button>Ask question</button>
                    </div>
                    <div className="filter">
                        <button>Filter</button>
                    </div>

                </div>

            </div>
        </StyledMain>
     );
}
 
export default Home;