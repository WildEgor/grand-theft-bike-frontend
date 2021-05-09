import React from "react";
import Officer from "./Officer.jsx";
import ModalAddOfficer from "./Add/ModalAddOfficer.jsx";
import EditOfficer from "./Edit/EditOfficer.jsx";
import useStyles from './Officers.module'
import {StyledButton} from 'Style/components'

const Officers = ({
  officers,
  editOfficer,
  deleteOfficer,
  isAddModalOpen,
  openAddModal,
  closeAddModal,
  onAddOfficerSubmit,
  selectedOfficerId,
  openEditOfficer,
  closeEditOfficer,
}) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.officers}>
        {officers.map((officer) => (
          <Officer
            key={officer._id}
            officer={officer}
            editOfficer={editOfficer}
            deleteOfficer={deleteOfficer}
            openEditOfficer={openEditOfficer}
          />
        ))}
      </div>
      {isAddModalOpen && (
        <ModalAddOfficer
          closeAddModal={closeAddModal}
          onAddOfficerSubmit={onAddOfficerSubmit}
        />
      )}
      {selectedOfficerId && (
        <EditOfficer
          officers={officers}
          selectedOfficerId={selectedOfficerId}
          editOfficer={editOfficer}
          closeEditOfficer={closeEditOfficer}
        />
      )}
      <StyledButton onClick={openAddModal}>
        Добавить сотрудника
      </StyledButton>
    </>
  );
};

export default Officers;
