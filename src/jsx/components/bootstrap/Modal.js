import React, { useState, useCallback } from "react";
import debounce from 'lodash.debounce';
import { Row, Card, Col, Button, Modal } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import image1 from "../../../images/characters/image-4.png";
import image2 from "../../../images/characters/image-5.png";
import image3 from "../../../images/characters/image-6.png";
import CharacterSelection from "../CharacterSelection";
import ChatWindow from "../Chat";
import axios from "axios";

const UiModal = () => {
  const [basicModal, setBasicModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Add isLoading state

  const characters = [
    { image: image1, name: 'Hecatoncheires' },
    { image: image2, name: 'Griffin' },
    { image: image3, name: 'Rakshasa' },
  ];

  const handleCharacterSelect = (index) => {
    setSelectedCharacter(index);
  };

  const handleStartChat = () => {
    setChatStarted(true);
  };

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Define debounced function for sending input message
  const handleSendInputMessage = useCallback(
    debounce(async () => {
      if (inputMessage.trim()) {
        handleSendMessage({ user: true, Msg: inputMessage });
        setInputMessage("");
        setIsLoading(true);  // Set loading to true when message is sent

        try {
          const response = await axios.post(
            'https://chat.mythosdialogues.com/character-response',
            { input_text: inputMessage }
          );

          const botResponse = response.data.response;
          handleSendMessage({ user: false, Msg: botResponse });
        } catch (error) {
          console.error('Error sending message:', error);
        } finally {
          setIsLoading(false);  // Set loading to false when bot responds
        }

        setInputMessage(""); // Clear input after sending
      }
    }, 500), [inputMessage] // Adjust debounce delay as needed
  );

  const handleBackToSelection = () => {
    setChatStarted(false);
  };

  const handleNewChat = () => {
    setChatStarted(false);
    setSelectedCharacter(null);
    setMessages([]);
  };

  return (
    <div className="h-80">
      <PageTitle
        pageContent="Chat"
        motherMenu={"Home"}
        activeMenu={"Chat"}
      />
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Chat Here</Card.Title>
            </Card.Header>
            <Card.Body>
              <Button
                variant="primary"
                className="mb-2 me-2"
                onClick={() => {
                  setBasicModal(true);
                  setChatStarted(false);
                  setSelectedCharacter(null);
                }}
              >
                Select Character & Start Chat
              </Button>

              <Modal
                size="lg"
                show={basicModal}
                onHide={() => setBasicModal(false)}
                centered
                style={{ maxHeight: '90vh' }}
              >
                <Modal.Header>
                  <Modal.Title>{chatStarted ? `Chat with ${characters[selectedCharacter]?.name}` : 'Select Character'}</Modal.Title>
                  <Button variant="close" onClick={() => setBasicModal(false)} />
                </Modal.Header>
                <Modal.Body style={{ height: chatStarted ? '80vh' : 'auto', overflowY: 'auto'}}>
                  {!chatStarted ? (
                    <CharacterSelection
                      characters={characters}
                      selectedCharacter={selectedCharacter}
                      onCharacterSelect={handleCharacterSelect}
                      onStartChat={handleStartChat}
                    />
                  ) : (
                    <ChatWindow
                      character={characters[selectedCharacter]}
                      messages={messages}
                      inputMessage={inputMessage}
                      onInputChange={(e) => setInputMessage(e.target.value)}
                      onSendMessage={handleSendInputMessage}
                      onBack={handleBackToSelection}
                      onNewChat={handleNewChat}
                      isLoading={isLoading}  // Pass the isLoading state
                    />
                  )}
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UiModal;
