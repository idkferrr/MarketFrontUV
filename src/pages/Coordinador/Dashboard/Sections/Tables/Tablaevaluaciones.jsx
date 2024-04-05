import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ArticleSharpIcon from "@mui/icons-material/ArticleSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import DisabledByDefaultSharpIcon from "@mui/icons-material/DisabledByDefaultSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UndoIcon from "@mui/icons-material/Undo";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    run: "12345678-9",
    nombre: "Jacinta ",
    apellidop: "Mayo",
    apellidom: "Perez",
    fsolicitud: "Día 9-12-2023 \nHora 12:00",
    factualizacion: "Día 13-12-2023 \nHora 13:00",
    practica: "Segunda",
    estado: "Sin acción",
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };
}

export default function Tablaevaluaciones() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  /*
  id: randomId(),
  run: "12345678-9",
  nombre: "Jacinta ",
  apellidop: "Mayo",
  apellidom: "Perez",
  fsolicitud: "Día 9-12-2023 \nHora 12:00",
  factualizacion: "Día 13-12-2023 \nHora 13:00",
  practica: "Segunda",
  estado: "Sin acción",
*/
  const columns = [
    { field: "run", headerName: "RUN", width: 180 },
    {
      field: "fsolicitud",
      headerName: "Fecha Solicitud",
      width: 140,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "factualizacion",
      headerName: "Fecha Modificación",
      width: 140,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "apellidop",
      headerName: "A. Paterno",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "apellidom",
      headerName: "A. Materno",
      width: 100,
      align: "left",
      headerAlign: "left",
    },

    {
      field: "practica",
      headerName: "Práctica",
      width: 80,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acción",
      width: 200,
      align: "left",
      headerAlign: "left",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<ArticleSharpIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Delete"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<UndoIcon />}
            label="Delete"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<WorkspacePremiumIcon />}
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Box sx={{ display: "flex", padding: 2 }}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          No evaluadas
        </Button>

        <Button variant="contained" color="success" sx={{ mr: 2 }}>
          Aprobadas
        </Button>

        <Button
          variant="contained"
          sx={{
            mr: 2,
            backgroundColor: "#86110e", // Replace with your custom color
            "&:hover": {
              backgroundColor: "#3f0605", // Replace with a darker shade for hover effect
            },
          }}
        >
          Reprobadas
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
