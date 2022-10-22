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

interface Props {
    user?: User;
}

const INITIAL_MATERIA: Materia = {
    name: "",
    year: 1,
    cuat: 1,
    correlativas: []
}
const MateriasComponent = ({ user }: Props) => {

    const history = useHistory();

    const [currentUser, setCurrentUser] = useState<User>(user!);
    const [nuevaMateria, setNuevaMateria] = useState<Materia>(INITIAL_MATERIA);
    const [correlativas, setCorrelativas] = useState<string[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        console.log(nuevaMateria.correlativas)
    }, [nuevaMateria])

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID de materia", width: 110, align: "center", headerAlign: "center", sortable: false },
        { field: "name", headerName: "Nombre de la materia", width: 500, align: "center", headerAlign: "center", sortable: false },
        { field: "year", headerName: "Año", width: 75, align: "center", headerAlign: "center", sortable: false },
        { field: "cuat", headerName: "Cuatrimestre", width: 120, align: "center", headerAlign: "center", sortable: false },
        { field: "correlativas", headerName: "correlativas", width: 200, align: "center", headerAlign: "center", sortable: true, valueGetter: (params: GridValueGetterParams) => `${params.row.correlativas.length}` }];

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

    const handleChange = (event: SelectChangeEvent<typeof correlativas>) => {
        const {
            target: { value },
        } = event;
        setCorrelativas(typeof value === 'string' ? value.split(',') : value);
    };

    const saveMateria = () => {
        let materiaFinal = nuevaMateria;
        materiaFinal.correlativas = correlativas;
        AdminService.createMateria(materiaFinal).then((response) => {
            updateList();
            setOpenModal(false);
            setNuevaMateria(INITIAL_MATERIA);
            setCorrelativas([]);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <Grid container style={{ display: "flex", alignContent: "center", justifyContent: "center", marginBottom: "3em" }}>
                <Grid item style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
                    <Paper elevation={2} style={{ width: "100%", padding: "1em", marginTop: "1em" }}>
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h4">Materias</Typography>
                            <IconButton onClick={() => setOpenModal(true)}>
                                <Typography>Añadir materia</Typography>
                                <AddCircleOutlineOutlined />
                            </IconButton>
                        </Box>
                        <Grid style={{ width: window.innerWidth * 0.7 }}>
                            <DataGrid
                                rows={materias}
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
                <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80%", border: "1px solid black", borderRadius: 3, backgroundColor: "white" }}>
                    <Paper elevation={2} style={{ padding: "1em" }}>
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h4">Añadir materia</Typography>
                            <IconButton onClick={() => { setOpenModal(false); setNuevaMateria(INITIAL_MATERIA) }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", paddingTop: "1em" }}>
                            <Typography style={{ marginRight: "1em" }}>Ingrese nombre de la materia</Typography>
                            <TextField
                                id="name"
                                placeholder="Nombre"
                                variant="outlined"
                                size="small"
                                required
                                value={nuevaMateria.name}
                                onChange={(e) => setNuevaMateria({ ...nuevaMateria, name: e.target.value })}
                                style={{ paddingBottom: "0.5em", width: "30%" }}
                            />
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", paddingTop: "1em" }}>
                            <Typography style={{ marginRight: "1em" }}>Seleccionar año</Typography>
                            <FormControl size="small" style={{ width: "60%" }}>
                                <Select
                                    id="year"
                                    variant="outlined"
                                    required
                                    value={nuevaMateria.year}
                                    onChange={(e) => setNuevaMateria({ ...nuevaMateria, year: Number(e.target.value) })}
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
                                    <MenuItem value={1}>1ro</MenuItem>
                                    <MenuItem value={2}>2do</MenuItem>
                                    <MenuItem value={3}>3ro</MenuItem>
                                    <MenuItem value={4}>4to</MenuItem>
                                    <MenuItem value={5}>5to</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", paddingTop: "1em" }}>
                            <Typography style={{ marginRight: "1em" }}>Seleccionar Cuatrimestre</Typography>
                            <FormControl size="small" style={{ width: "60%" }}>
                                <Select
                                    id="cuat"
                                    label="Cuatrimestre"
                                    variant="outlined"
                                    required
                                    value={nuevaMateria.cuat}
                                    onChange={(e) => setNuevaMateria({ ...nuevaMateria, cuat: Number(e.target.value) })}
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
                                    <MenuItem value={1}>1ro</MenuItem>
                                    <MenuItem value={2}>2do</MenuItem>
                                </Select>

                            </FormControl>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: "1em" }}>
                            <Typography style={{ width: "15%" }}>Seleccionar correlativas</Typography>
                            <FormControl size="small" style={{ width: "100%" }}>
                                <Select
                                    id="correlativas"
                                    variant="outlined"
                                    multiple
                                    value={correlativas}
                                    renderValue={(selected: any) => selected.join(",")}
                                    //@ts-ignore
                                    onChange={handleChange}
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
                                    {
                                        materias.map((materia) =>
                                            <MenuItem
                                                value={materia.id}
                                            >
                                                <Checkbox checked={correlativas.indexOf(materia?.id!) > -1} />
                                                <ListItemText primary={materia.name} />
                                            </MenuItem>)
                                    }
                                </Select>
                            </FormControl>

                        </Box>
                        <Box style={{ display: "flex", justifyContent: "flex-end", marginTop: "1em" }}>
                            <Button variant="contained" color="primary" onClick={saveMateria}>
                                Guardar
                            </Button>
                        </Box>
                    </Paper>
                </Box>

            </Modal>
        </>
    )
}
export default MateriasComponent;