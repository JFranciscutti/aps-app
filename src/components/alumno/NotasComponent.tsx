import { Grid, Paper, Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../models/User";
import UserService from "../../services/UserService";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { MateriaAlumno } from "../../models/MateriaAlumno";


interface Props {
    user?: User;
}
const NotasComponent = ({ user }: Props) => {

    const history = useHistory();

    const [currentUser, setCurrentUser] = useState<User>(user!);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID de materia", width: 110, align: "center", headerAlign: "center", sortable: false },
        { field: "name", headerName: "Nombre de la materia", width: 200, align: "center", headerAlign: "center", sortable: false },
        { field: "state", headerName: "Estado", width: 200, align: "center", headerAlign: "center", sortable: false },
        { field: "year", headerName: "Año", width: 75, align: "center", headerAlign: "center", sortable: false },
        { field: "cuat", headerName: "Cuatrimestre", width: 120, align: "center", headerAlign: "center", sortable: false },
        { field: "lastUpdate", headerName: "Última modificación", width: 200, align: "center", headerAlign: "center", sortable: true }];

    const rows: MateriaAlumno[] = [
        { id: 5551, name: "Análisis Matemático I", state: "7 - Aprobado", year: 1, cuat: 2, lastUpdate: new Date() },
        { id: 5551, name: "Análisis Matemático I", state: "7 - Aprobado", year: 1, cuat: 2, lastUpdate: new Date() },
        { id: 5551, name: "Análisis Matemático I", state: "7 - Aprobado", year: 1, cuat: 2, lastUpdate: new Date() },
        { id: 5551, name: "Análisis Matemático I", state: "7 - Aprobado", year: 1, cuat: 2, lastUpdate: new Date() },
        { id: 5551, name: "Análisis Matemático I", state: "7 - Aprobado", year: 1, cuat: 2, lastUpdate: new Date() },
        { id: 5551, name: "Análisis Matemático I", state: "7 - Aprobado", year: 1, cuat: 2, lastUpdate: new Date() },
        { id: 5551, name: "Análisis Matemático I", state: "7 - Aprobado", year: 1, cuat: 2, lastUpdate: new Date() },
        { id: 5551, name: "Análisis Matemático I", state: "7 - Aprobado", year: 1, cuat: 2, lastUpdate: new Date() },
        { id: 5551, name: "Análisis Matemático I", state: "7 - Aprobado", year: 1, cuat: 2, lastUpdate: new Date() },
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
        <Grid container style={{ display: "flex", alignContent: "center", justifyContent: "center", marginBottom: "3em" }}>
            <Grid item style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
                <Paper elevation={2} style={{ width: "100%", padding: "1em", marginTop: "1em" }}>
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h4">Mis notas</Typography>
                    </Box>
                    <Grid style={{ width: window.innerWidth * 0.7 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
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
export default NotasComponent;