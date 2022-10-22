import { Grid, Paper, Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../models/User";
import UserService from "../../services/UserService";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AdminService from "../../services/AdminService";

interface Props {
    user?: User;
}
const AlumnosComponent = ({ user }: Props) => {

    const history = useHistory();

    const [currentUser, setCurrentUser] = useState<User>(user!);
    const [alumnos, setAlumnos] = useState<User[]>([]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50, align: "center", headerAlign: "center", sortable: false },
        { field: "firstName", headerName: "Nombre", width: 200, align: "center", headerAlign: "center", sortable: false },
        { field: "lastName", headerName: "apellido", width: 200, align: "center", headerAlign: "center", sortable: false },
        { field: "email", headerName: "E-mail", width: 250, align: "center", headerAlign: "center", sortable: false }
    ]

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
        AdminService.getAlumnos().then((response: any) => {
            setAlumnos(response.data);
        }).catch((error) => console.log(error))
    }

    return (
        <>
            <Grid container style={{ display: "flex", alignContent: "center", justifyContent: "center", marginBottom: "3em" }}>
                <Grid item style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
                    <Paper elevation={2} style={{ width: "100%", padding: "1em", marginTop: "1em" }}>
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h4">Alumnos</Typography>
                        </Box>
                        <Grid style={{ width: window.innerWidth * 0.7 }}>
                            <DataGrid
                                rows={alumnos}
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
        </>
    )
}
export default AlumnosComponent;