import { Grid, Paper, Box, Typography, IconButton, Modal, Button, TextField, MenuItem, FormControl, InputLabel, ListItemText, Checkbox, OutlinedInput, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../models/User";
import UserService from "../../services/UserService";
import { DataGrid, GridApi, GridCellValue, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Materia } from "../../models/Materia";
import { AddCircleOutlineOutlined, Edit } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { SelectChangeEvent } from '@mui/material/Select';
import AdminService from "../../services/AdminService";
import { MesaExamen } from "../../models/MesaExamen";
import moment from "moment";
import ProfeService from "../../services/ProfeService";

interface Props {
    user?: User;
}

const INITIAL_MATERIA: Materia = {
    name: "",
    year: 1,
    cuat: 1,
    correlativas: []
}

const ExamenesAlumnoComponent = ({ user }: Props) => {

    const history = useHistory();
    const [currentUser, setCurrentUser] = useState<User>(user!);

    const INITIAL_MESA: MesaExamen = {
        materia: INITIAL_MATERIA,
        alumnos: [],
        fecha: new Date(),
        inicioInscripcion: new Date(),
        finInscripcion: new Date(),
        profesor: currentUser
    }
    const [nuevaMesa, setNuevaMesa] = useState<MesaExamen>(INITIAL_MESA);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [mesas, setMesas] = useState<MesaExamen[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);



    const columns: GridColDef[] = [
        { field: "materia", headerName: "Materia", width: 300, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${params.row.materia.name}` },
        { field: "alumnos", headerName: "Alumnos inscriptos", width: 200, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${params.row.alumnos.length}` },
        { field: "fecha", headerName: "Fecha", width: 200, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${moment(params.row.fecha).format("DD/MM/YYYY h:mm A")}` },
        { field: "inicioInscripcion", headerName: "Fecha inicio de inscripción", width: 200, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${moment(params.row.inicioInscripcion).format("DD/MM/YYYY h:mm A")}` },
        { field: "finInscripcion", headerName: "Fecha fin de inscripción", width: 200, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${moment(params.row.finInscripcion).format("DD/MM/YYYY h:mm A")}` },
        {
            field: "",
            headerName: "Inscripción",
            sortable: false,
            renderCell: (params) => {
                const onClick = (e: any) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    //@ts-ignore
                    handleInscripcion(thisRow);
                    //return alert(JSON.stringify(thisRow.materia));
                };

                return <Button onClick={onClick}>Inscribirse</Button>;
            }
        },
    ];

    const handleInscripcion = (materia: Materia) => {
        ProfeService.inscribir(materia, currentUser)
            .then((response) => {
                alert(`Inscripto a ${materia.name}!`)
            })
            .catch((error) => alert("Error en control de correlativas"))
    }

    useEffect(() => {
        updateList();
    }, []);

    const updateList = () => {
        AdminService.getMaterias().then((response: any) => {
            setMaterias(response.data);
        }).catch((error) => console.log(error));

        ProfeService.getMesas().then((response: any) => {
            setMesas(response.data)
        }).catch((error) => console.log(error));
    }

    const publicarMateria = () => {
        let finalMesa = nuevaMesa;
        finalMesa.profesor = currentUser;

        ProfeService.createMesa(finalMesa).then((response: any) => {
            setNuevaMesa(INITIAL_MESA);
            setOpenModal(false);
            updateList();
        }).catch(error => console.log(error))

    }

    return (
        <Grid container style={{ display: "flex", alignContent: "center", justifyContent: "center", marginBottom: "3em" }}>
            <Grid item style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
                <Paper elevation={2} style={{ width: "100%", padding: "1em", marginTop: "1em" }}>
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h4">Mesas de examen</Typography>
                        <IconButton onClick={() => setOpenModal(true)}>
                            <Typography>Añadir mesa</Typography>
                            <AddCircleOutlineOutlined />
                        </IconButton>
                    </Box>
                    <Grid style={{ width: window.innerWidth * 0.7 }}>
                        <DataGrid
                            rows={mesas}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            autoHeight
                            disableSelectionOnClick
                            disableColumnFilter
                            disableColumnMenu
                            disableColumnSelector
                        />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}
export default ExamenesAlumnoComponent;