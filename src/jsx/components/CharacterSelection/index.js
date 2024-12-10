// CharacterSelection.js
import React from 'react';
import { Button } from 'react-bootstrap';

const CharacterSelection = ({ characters, selectedCharacter, onCharacterSelect, onStartChat }) => {
  return (
    <>
      <h3 className="text-primary text-center font-w600">Welcome to Mythos Anthology AI</h3>
      <p className="text-center fs-6">Unearthing Myths, Monsters, and Legends of Myth with the Power of Cutting-Edge AI.</p>
      <h4 className="text-center mt-5">Select Your Mythos Anthology Character To Chat</h4>
      <div className="profile-photo mt-3 d-flex justify-content-evenly">
        {characters.map((character, index) => (
          <div key={index} className="text-center">
            <img
              src={character.image}
              alt={character.name}
              className="img-fluid rounded-circle"
              onClick={() => onCharacterSelect(index)}
              style={{
                border: selectedCharacter === index ? '5px solid #13aff0' : '5px solid #fff',
                boxSizing: 'border-box',
              }}
            />
            <p className="mt-2" style={{ fontWeight: selectedCharacter === index ? 'bold' : 'normal' }}>
              {character.name}
            </p>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end mt-4">
        <Button
          variant="primary"
          onClick={onStartChat}
          disabled={selectedCharacter === null}
        >
          Start Chat
        </Button>
      </div>
    </>
  );
};

export default CharacterSelection;
