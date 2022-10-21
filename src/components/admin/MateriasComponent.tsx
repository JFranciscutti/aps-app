import { Grid, Paper, Box, Typography, IconButton, Modal } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../models/User";
import UserService from "../../services/UserService";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { MateriaAdmin } from "../../models/MateriaAdmin";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    user?: User;
}
const MateriasComponent = ({ user }: Props) => {

    const history = useHistory();

    const [currentUser, setCurrentUser] = useState<User>(user!);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID de materia", width: 110, align: "center", headerAlign: "center", sortable: false },
        { field: "name", headerName: "Nombre de la materia", width: 200, align: "center", headerAlign: "center", sortable: false },
        { field: "year", headerName: "Año", width: 75, align: "center", headerAlign: "center", sortable: false },
        { field: "cuat", headerName: "Cuatrimestre", width: 120, align: "center", headerAlign: "center", sortable: false },
        { field: "correlativas", headerName: "correlativas", width: 200, align: "center", headerAlign: "center", sortable: true, valueGetter: (params: GridValueGetterParams) => `${params.row.correlativas.length}` }];

    const rows: MateriaAdmin[] = [
        { id: 5551, name: "Análisis Matemático I", year: 1, cuat: 1, correlativas: [] },
    ];

    useEffect(() => {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        if (!!email && !!password) {
            UserService.getByEmailAndPassword(email, password).then((response: any) => {
                setCurrentUser(response.data);
            });
        }
    }, []);

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
                                rows={rows}
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
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography >Nueva materia</Typography>
                        <IconButton onClick={() => setOpenModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>

            </Modal>
        </>
    )
}
export default MateriasComponent;