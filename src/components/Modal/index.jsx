import ReactDOM from "react-dom";
import { useRef } from "react";
import "./index.css";

const Modal = ({ onClose, developer = [] }) => {
  const modalRef = useRef(null);

  const handleClose = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div ref={modalRef} className="modal__container" onClick={handleClose}>
      <div className="modal__box">
        <div className="modal__close" onClick={onClose}>
          x
        </div>

        <div className="modal__box--developer">
          <img src={developer.image} className="modal__box--developer-image" />
          <div className="modal__box--developer-detailes">
            <div className="modal__box--developer-name">
              <span className="bold skill">App Developer :</span>
              <span className="skill">{developer.name}</span>
            </div>
            <div className="modal__box--developer-designation">
              <span className="bold skill">Role :</span> <span className="skill">{developer.role}</span>
            </div>
            <span className="bold skill">The tools I used to build this app :</span>
           <div className="skills">
            {developer.skills.map((skill, index)=> (
                <span className="skill" key={index}>{skill}</span>
            ))}
           </div>
           <span className="bold skill">The hooks I used to build this app :</span>
           <div className="skills">
            {developer.hooks.map((hook, index)=> (
                <span className="skill" key={index}>{hook}</span>
            ))}
           </div>
           <div className="design-refered">
           <a href={`${developer.refer}`} target="_blank" className="bold skill">Design Referenced 👆</a> 
           <a href={`${developer.portfolio}`} target="blank" className="bold skill">Personal Portfolio 👆</a> 
           </div>

          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};
export default Modal;
