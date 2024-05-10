import "../../style/popup.css"
import AddWord from './../../components/words/AddWord';
interface PopupAddWordProps {
    onClose: () => void;
  }
  
  const PopupLogin: React.FC<PopupAddWordProps> = ({ onClose }) => {
    return (
      <div className="popup">
        <div className="popup-inner">
          <button className="close" onClick={onClose}>X</button>
          <AddWord />
        </div>
      </div>
    );
  };
  
  export default PopupLogin;