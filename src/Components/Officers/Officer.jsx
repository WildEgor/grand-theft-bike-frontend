import React from "react";
import useStyles from './Officers.module'
import {StyledButton} from 'Style/components'

const Officer = ({ officer, editOfficer, deleteOfficer, openEditOfficer }) => {
  const classes = useStyles()
  return (
    <div className={classes.officer}>
      <button
        to={`/officers/${officer._id}`}
        className={classes.name}
        onClick={() => openEditOfficer(officer._id)}
      >
        {officer.firstName} {officer.lastName}
        {officer.approved ? <> &#10003;</> : ""}
      </button>
      <div className={classes.buttons}>
        <StyledButton
          //className={classes.button}
          onClick={() => editOfficer({officerId: officer._id, officerData: { approved: true }})}
          disabled={officer.approved}
        >
          Одобрить
        </StyledButton>
        <StyledButton 
          // className={classes.button} 
          onClick={() => deleteOfficer({ officerId: officer._id })}
        >
          Удалить
        </StyledButton>
      </div>
    </div>
  );
};

export default Officer;