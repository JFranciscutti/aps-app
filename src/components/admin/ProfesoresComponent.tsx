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

const ProfesoresComponent = ({ user }: Props) => {

    const history = useHistory();

    const [currentUser, setCurrentUser] = useState<User>(user!);
    const [profesores, setProfesores] = useState<User[]>([]);

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
        AdminService.getProfesores().then((response: any) => {
            setProfesores(response.data);
        }).catch((error) => console.log(error))
    }

    return (
        <>
            <Grid container style={{ display: "flex", alignContent: "center", justifyContent: "center", marginBottom: "3em" }}>
                <Grid item style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
                    <Paper elevation={2} style={{ width: "100%", padding: "1em", marginTop: "1em" }}>
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h4">Profesores</Typography>
                        </Box>
                        <Grid style={{ width: window.innerWidth * 0.7 }}>
                            <DataGrid
                                rows={profesores}
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
export default ProfesoresComponent;