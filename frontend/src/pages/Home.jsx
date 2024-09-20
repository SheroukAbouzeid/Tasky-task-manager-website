import styled from "styled-components"

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;`

const Title = styled.h1``;

const Tip = styled.p`
  font-size: 20px;
  color: #333;
  margin-top: 20px;
  text-align: center;
`;


const Home = () => {
  return (
    <Container>
      <Title>Elmasry was here!</Title>
      <Tip>
        packages installed:
        <br />
        - styled-components
        <br />
        link for styled-components doc:
        <a href="https://styled-components.com/" target="_blank">Link</a>
        <br />
        - vite
        <br />
        link for vite doc: <a href="https://vitejs.dev/" target="_blank">Link</a>
      </Tip>
    </Container>
  );
}

export default Home
