import React from "react";
import useStyles from 'Components/Officers/Officers.module'
import close from "Img/close.svg";
import UserCreateForm from "Components/UserCreate/UserCreateForm.jsx";

const ModalAddOfficer = ({ closeAddModal, onAddOfficerSubmit }) => {
  const classes = useStyles()
  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <UserCreateForm
          onSubmit={onAddOfficerSubmit}
          buttonName="Добавить сотрудника"
        />
        <button className={classes.close} onClick={closeAddModal}>
          <img src={close} className={classes.closeImage} alt="Х" />
        </button>
      </div>
    </div>
  );
};

export default ModalAddOfficer;
