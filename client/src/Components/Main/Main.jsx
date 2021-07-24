import { Link } from "react-router-dom";
import React from "react";

import { useStyles, StyledTypography, StyledButton } from 'Style/components'

const Main = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}> 
      <StyledTypography>
        Если у Вас украли велосипед из нашего проката, сообщите нам об этом!
      </StyledTypography>
      <StyledButton>
        <Link to="/theft-message">
          Сообщить о краже
        </Link>
      </StyledButton>
    </div>
  );
};

export default Main;