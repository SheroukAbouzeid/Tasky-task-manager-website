import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainDiv = styled.div`
  display: flex;
  height: 100vh;
  background-color: #222831;
  font-family: "Times New Roman", Times, serif;
  /* Set font to Times New Roman */
`;

const SideBanner = styled.div`
  background: linear-gradient(to bottom, #393e46, #32e0c4);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SideBannerLogo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 300px;
    height: auto;
  }
`;

const SideBannerMockup = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 500px;
    height: auto;
  }
`;

const SideBannerText = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 22px;
    text-align: center;
    max-width: 400px;
    color: #ffffff;
  }
`;

const LogInForm = styled.div`
  background-color: #222831;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogInFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: 40vh;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
`;

const LogInFormTitle = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  top: 15vh;
  h1 {
    font-size: 28px;
    color: #32e0c4;
  }
`;
const Message = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 15px;
    color: #ff0000;
  }
`;
const LogFormInputs = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    background-color: transparent;
    color: #ffffff; /* White text color */
    transition: border-color 0.3s, color 0.3s;

    &:hover {
      border-color: #32e0c4;
    }

    &:focus {
      border-color: #32e0c4;
      outline: none;
    }
  }
`;

const LogInFormButton = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: linear-gradient(to left, #393e46, #32e0c4);
    color: #ffffff;
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
    transition: background 0.3s;

    &:hover {
      background: linear-gradient(to right, #393e46, #32e0c4);
    }
  }
`;

const LogInFormSignup = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 14px;
    color: #ffffff;

    .highlighted {
      color: #32e0c4;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #ffffff;
      }
    }
  }
`;

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submissionMessage, setSubmissionMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to the API
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); // You can handle the response data (like a token) here
        setSubmissionMessage("Login successful!");
        navigate("/home");
        console.log(result.userId);
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('firstName', result.firstName);
        localStorage.setItem('lastName', result.lastName);
        localStorage.setItem('email', result.email);

      } else {
        const error = await response.json();
        console.log(error);
        setSubmissionMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <MainDiv>
      <SideBanner>
        <SideContainer>
          <SideBannerLogo>
            <img src="..\assets\Logo_cropped.png" alt="Tasky Logo" />
          </SideBannerLogo>
          <SideBannerMockup>
            <img src="..\assets\Desktop_cropped.png" alt="Desktop" />
          </SideBannerMockup>
          <SideBannerText>
            <p>Your go-to Task manager!</p>
          </SideBannerText>
        </SideContainer>
      </SideBanner>

      <LogInForm>
        <LogInFormContainer onSubmit={handleSubmit}>
          <LogInFormTitle>
            <h1>Welcome Back!</h1>
          </LogInFormTitle>
          <LogFormInputs>
            <Inputs>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </Inputs>
            <Inputs>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </Inputs>
          </LogFormInputs>
          {submissionMessage && (
            <Message>
              {" "}
              <p>{submissionMessage}</p>
            </Message>
          )}

          <LogInFormButton>
            <button type="submit">Log In</button>
          </LogInFormButton>
          <LogInFormSignup>
            <p>
              Don't have an account?{" "}
              <a href="./Register" className="highlighted">Sign Up</a>
            </p>
          </LogInFormSignup>
        </LogInFormContainer>
      </LogInForm>
    </MainDiv>
  );
};

export default LogIn;
