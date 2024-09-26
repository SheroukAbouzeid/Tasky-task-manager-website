import React, { useState } from 'react';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column; 
  height: 100vh;
  background: linear-gradient(to bottom, #000000, #32e0c4);
  justify-content: center;
  align-items: center;
  color: white; 
  padding: 20px; 
  text-align: center; 
`;

const ContactForm = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ContactFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  max-width: 500px;
  padding: 20px;
`;

const ContactFormTitle = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

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

const ContactFormInputs = styled.div`
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

  input, textarea {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ffffff; 
    border-radius: 5px;
    background-color: #ffffff; 
    color: #000000; /* White text color */
    transition: border-color 0.3s, color 0.3s; 

    &:hover {
      border-color: #32e0c4;
    }

    &:focus {
      border-color: #32e0c4; 
      outline: none; 
    }
  }

  textarea {
    resize: none; /* Disable resizing */
    height: 100px; /* Set height for the textarea */
  }
`;

const SendButton = styled.button`
  background: #000000;
  color: #32E0C4;
  padding: 10px 30px;
  margin: 20px;
  font-size: 18px;
  font-weight: bold; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #393e46, #32e0c4);
    color: #000000;
    border: 3px solid;
    border-color: #000000;
  }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission (e.g., send data to a server)
    console.log('Form submitted:', formData);
    setSubmissionMessage('Your message has been sent successfully!'); // Example message
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <MainDiv>
      <ContactForm>
        <ContactFormContainer onSubmit={handleSubmit}>
          <ContactFormTitle>
            <h1>Contact Us</h1>
          </ContactFormTitle>
          <ContactFormInputs>
            <Inputs>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            </Inputs>
            <Inputs>
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            </Inputs>
            <Inputs>
              <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
            </Inputs>
            {submissionMessage && <Message><p>{submissionMessage}</p></Message>}
          </ContactFormInputs>
          <SendButton type="submit">Send Message</SendButton>
        </ContactFormContainer>
      </ContactForm>
    </MainDiv>
  );
}

export default ContactPage;
