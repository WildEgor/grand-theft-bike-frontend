import React from "react";
import BikesTable from "./BikesTable.jsx";
import { Colors, Delete, Status, Owner } from "./TableCells.jsx";
import Resolution from "./Resolution/Resolution.jsx";
import EditMessage from "./EditMessage/EditMessage.jsx";

import {StyledTypography} from 'Style/components'

const StolenBikes = ({
  formattedThefts,
  officers,
  deleteMessage,
  editMessage,
  isResolutionOpen,
  onStatusDoneClicked,
  openResolution,
  closeResolution,
  selectedMessageId,
  openEditMessage,
  closeEditMessage,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Дата",
        accessor: "date",
      },
      {
        Header: "Тип",
        accessor: "type",
      },
      {
        Header: "Цвет",
        accessor: "color",
        Cell: ({ cell: { value } }) => <Colors value={value} />,
      },
      {
        Header: "Имя владельца",
        accessor: "ownerFullName",
        Cell: ({ cell: { value, row } }) => (
          <Owner
            value={value}
            id={row.values._id}
            openEditMessage={openEditMessage}
          />
        ),
      },
      {
        Header: "Ответственный сотрудник",
        accessor: "officer",
      },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ cell: { value, row } }) => (
          <Status
            value={value}
            id={row.values._id}
            editMessage={editMessage}
            openResolution={openResolution}
          />
        ),
      },
      {
        Header: "Изменён",
        accessor: "updateAt",
      },
      {
        Header: "Решение",
        accessor: "resolution",
      },
      {
        Header: "",
        accessor: "_id",
        Cell: ({ cell: { value } }) => (
          <Delete value={value} deleteMessage={deleteMessage} />
        ),
      },
    ],
    []
  );
  const data = formattedThefts;

  return (
    <>
      {data.length > 0 ? (
        <>
          <BikesTable
            columns={columns}
            data={data}
            openResolution={openResolution}
          />
          <br />
          <StyledTypography variant='h4'>
            * Нажмите, для получения подробной информации и редактирования
          </StyledTypography>
        </>
      ) : (
        <StyledTypography>Нет сообщений о кражах</StyledTypography>
      )}
      {isResolutionOpen ? (
        <Resolution
          onStatusDoneClicked={onStatusDoneClicked}
          closeResolution={closeResolution}
        />
      ) : (
        ""
      )}
      {selectedMessageId ? (
        <EditMessage
          formattedThefts={formattedThefts}
          officers={officers}
          selectedMessageId={selectedMessageId}
          closeEditMessage={closeEditMessage}
          editMessage={editMessage}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default StolenBikes;
