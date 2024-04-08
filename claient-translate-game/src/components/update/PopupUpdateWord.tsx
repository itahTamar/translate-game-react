import React from 'react'
import UpdateWord from './UpdateWord';

interface PopupUpdateWordProps {
  onClose: () => void;
}

const PopupUpdateWord: React.FC<PopupUpdateWordProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close" onClick={onClose}>X</button>
        <UpdateWord />
      </div>
    </div>
  );
};

export default PopupUpdateWord