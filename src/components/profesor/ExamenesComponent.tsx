import { Grid, Paper, Box, Typography, IconButton, Modal, Button, TextField, MenuItem, FormControl, InputLabel, ListItemText, Checkbox, OutlinedInput, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../models/User";
import UserService from "../../services/UserService";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Materia } from "../../models/Materia";
import { AddCircleOutlineOutlined, Edit } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { SelectChangeEvent } from '@mui/material/Select';
import AdminService from "../../services/AdminService";
import { MesaExamen } from "../../models/MesaExamen";
import moment from "moment";

interface Props {
    user?: User;
}

const INITIAL_MATERIA: Materia = {
    name: "",
    year: 1,
    cuat: 1,
    correlativas: []
}

const ExamenesComponent = ({ user }: Props) => {

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
        { field: "materia", headerName: "Materia", width: 500, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${params.row.materia.name}` },
        { field: "alumnos", headerName: "Alumnos inscriptos", width: 200, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${params.row.alumnos.length}` },
        { field: "fecha", headerName: "Fecha", width: 100, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${moment(params.row.fecha).format("DD/MM/YYYY h:mm A")}` },
        { field: "inicioInscripcion", headerName: "Fecha inicio de inscripción", width: 200, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${moment(params.row.inicioInscripcion).format("DD/MM/YYYY h:mm A")}` },
        { field: "finInscripcion", headerName: "Fecha fin de inscripción", width: 200, align: "center", headerAlign: "center", sortable: false, valueGetter: (params: GridValueGetterParams) => `${moment(params.row.finInscripcion).format("DD/MM/YYYY h:mm A")}` }
    ];

    useEffect(() => {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        if (!!email && !!password) {
            UserService.getByEmailAndPassword(email, password).then((response: any) => {
                setCurrentUser(response.data);
            });
        }
        updateList();
    }, []);

    const updateList = () => {
        AdminService.getMaterias().then((response: any) => {
            setMaterias(response.data);
        }).catch((error) => console.log(error))
    }

    const publicarMateria = () => {
        console.log(nuevaMesa);
        setNuevaMesa(INITIAL_MESA);
        setOpenModal(false);
    }

    return (
        <>
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
            <Modal open={openModal} >
                <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "50%", border: "1px solid black", borderRadius: 3, backgroundColor: "white" }}>
                    <Paper elevation={2} style={{ padding: "1em" }}>
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h4">Añadir mesa de examen</Typography>
                            <IconButton onClick={() => { setOpenModal(false); setNuevaMesa(INITIAL_MESA) }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", paddingTop: "1em" }}>
                            <Typography style={{ width: "20%" }}>Seleccione materia</Typography>
                            <FormControl size="small" style={{ width: "60%" }}>
                                <Select
                                    id="materia"
                                    variant="outlined"
                                    required
                                    value={nuevaMesa.materia}
                                    //@ts-ignore
                                    onChange={(e) => setNuevaMesa({ ...nuevaMesa, materia: e.target.value })}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        transformOrigin: {
                                            vertical: "top",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }}
                                >
                                    {materias.map((materia) =>
                                        //@ts-ignore
                                        <MenuItem value={materia}>{materia.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", paddingTop: "1em" }}>
                            <Typography style={{ width: "20%" }}>Fecha</Typography>
                            <FormControl size="small" style={{ width: "25%" }}>
                                <TextField
                                    id="fecha"
                                    value={nuevaMesa.fecha}
                                    //@ts-ignore
                                    onChange={(e) => setNuevaMesa({ ...nuevaMesa, fecha: e.target.value })}
                                    variant="outlined"
                                    type="datetime-local"
                                    size="small"
                                    required
                                />
                            </FormControl>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", paddingTop: "1em" }}>
                            <Typography style={{ width: "20%" }}>Inicio de inscripción</Typography>
                            <FormControl size="small" style={{ width: "25%" }}>
                                <TextField
                                    id="inicio"
                                    value={nuevaMesa.inicioInscripcion}
                                    //@ts-ignore
                                    onChange={(e) => setNuevaMesa({ ...nuevaMesa, inicioInscripcion: e.target.value })}
                                    variant="outlined"
                                    type="datetime-local"
                                    size="small"
                                    required
                                />
                            </FormControl>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", paddingTop: "1em" }}>
                            <Typography style={{ width: "20%" }}>Fin de inscripción</Typography>
                            <FormControl size="small" style={{ width: "25%" }}>
                                <TextField
                                    id="fin"
                                    value={nuevaMesa.finInscripcion}
                                    //@ts-ignore
                                    onChange={(e) => setNuevaMesa({ ...nuevaMesa, finInscripcion: e.target.value })}
                                    variant="outlined"
                                    type="datetime-local"
                                    size="small"
                                    required
                                />
                            </FormControl>
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "flex-end", marginTop: "1em" }}>
                            <Button variant="contained" color="primary" onClick={publicarMateria}>
                                Publicar
                            </Button>
                        </Box>
                    </Paper>
                </Box>

            </Modal>
        </>
    )
}
export default ExamenesComponent;