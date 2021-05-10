import React, { useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router";
import {
  dateFormatter,
  typeFormatterToRus,
} from "Utils/formatter-utils.js";
import StolenBikes from "./StolenBikes.jsx";

import { 
  useStoreActions, 
  useStoreState 
} from 'easy-peasy';

const StolenBikesContainer = () => {
  const isAuth  = useStoreState(state => state.auth.authState.isAuth);
  const officers = useStoreState(state => state.officers.officersState.officers);
  const thefts = useStoreState(state => state.theftMessage.theftMessageState.thefts);
  const getOfficersList = useStoreActions(action => action.officers.getOfficersList);
  const getTheftMessages = useStoreActions(action => action.theftMessage.getTheftMessages);
  const deleteMessage = useStoreActions(action => action.theftMessage.deleteMessage);
  const editMessage = useStoreActions(action => action.theftMessage.editMessage);

  useEffect(() => {
    getOfficersList();
    getTheftMessages();
  }, []);

  const [isResolutionOpen, setIsResolutionOpen] = useState(false);
  const [resolutionId, setResolutionId] = useState("");
  const openResolution = (id) => {
    setResolutionId(id);
    setIsResolutionOpen(true);
  };
  const closeResolution = () => setIsResolutionOpen(false);
  const onStatusDoneClicked = (resolution) => {
    if (resolution) {
      closeResolution();
      editMessage({ messageId: resolutionId, newMessage: { status: "done", resolution }});
    }
  };

  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isEditMessageOpen, setIsEditMessageOpen] = useState(false);
  const openEditMessage = (id) => {
    setSelectedMessageId(id)
    setIsEditMessageOpen(true)
  };
  const closeEditMessage = () => {
    setSelectedMessageId(null)
    setIsEditMessageOpen(false)
  };

  const formattedThefts = [];
  if (thefts) {
    thefts.forEach((theft) => {
      const currentOfficer = officers.find(
        (officer) => officer._id === theft.officer
      );

      formattedThefts.push({
        ...theft,
        date: dateFormatter(theft.date),
        createdAt: dateFormatter(theft.createdAt),
        updateAt: dateFormatter(theft.updateAt),
        officer: currentOfficer
          ? `${currentOfficer.firstName} ${currentOfficer.lastName}`
          : "",
        type: typeFormatterToRus(theft.type),
      });
    });
  }

  if (!isAuth) 
    return <Redirect to={"/"} />;

  return (
    <StolenBikes
      formattedThefts={formattedThefts}
      officers={officers}
      deleteMessage={deleteMessage}
      editMessage={editMessage}
      isResolutionOpen={isResolutionOpen}
      onStatusDoneClicked={onStatusDoneClicked}
      openResolution={openResolution}
      closeResolution={closeResolution}
      selectedMessageId={selectedMessageId}
      openEditMessage={openEditMessage}
      closeEditMessage={closeEditMessage}
      isEditMessageOpen={isEditMessageOpen}
    />
  );
};

export default withRouter(StolenBikesContainer);