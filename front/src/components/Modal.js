const Modal = ({onClose, text }) => {
  return (
    <div className="modal">
      <button className="modal-cl-btn" onClick={onClose}>X</button>
      <p>{text}</p>
    </div>
  )
}

export default Modal;
