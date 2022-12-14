import { Grid, Paper, Box, Typography, IconButton, TextField, Button } from "@material-ui/core";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../models/User";
import UserService from "../services/UserService";
import { Routes } from "../utils/Routes";

interface Props {
    user?: User;
}
const EditDataComponent = ({ user }: Props) => {

    const history = useHistory();

    const [userToUpdate, setUserToUpdate] = useState<User>(user!)
    const [enableEdit, setEnableEdit] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [repPassword, setRepPassword] = useState<string>("");

    useEffect(() => {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        if (!!email && !!password) {
            UserService.getByEmailAndPassword(email, password).then((response: any) => {
                setUserToUpdate(response.data);
            });
        }
    }, []);

    const handleUpdateData = () => {
        if (password === repPassword) {
            let finalUser: User = userToUpdate!;
            finalUser.password = password === "" ? userToUpdate?.password! : password;
            UserService.update(finalUser!).then((response: any) => {
                history.push({ pathname: Routes.HOME, state: { user: response.data } })
                setEnableEdit(false);
            }).catch((error: any) => {
                console.log(error);
            })
        }
    }

    return (
        <Grid container style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
            <Grid item style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
                <Paper elevation={2} style={{ width: "100%", padding: "1em", marginTop: "1em" }}>
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h4">Mis datos</Typography>
                        <IconButton onClick={() => setEnableEdit(true)}>
                            <Edit />
                        </IconButton>
                    </Box>
                    <Box style={{ paddingTop: "1em" }}>
                        <TextField
                            variant="standard"
                            fullWidth
                            aria-readonly={!enableEdit}
                            required
                            style={{ paddingBottom: "0.5em" }}
                            value={userToUpdate?.firstName}
                            disabled={!enableEdit}
                            onChange={(e) => setUserToUpdate({ ...userToUpdate!, firstName: e.target.value })}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            required
                            style={{ paddingBottom: "0.5em" }}
                            disabled={!enableEdit}
                            value={userToUpdate?.lastName}
                            defaultValue={user?.lastName}
                            onChange={(e) => setUserToUpdate({ ...userToUpdate!, lastName: e.target.value })}
                        />

                        <TextField
                            variant="standard"
                            fullWidth
                            required
                            style={{ paddingBottom: "0.5em" }}
                            disabled
                            value={userToUpdate?.email}
                        />
                        {enableEdit && <>
                            <TextField
                                label="Contrase??a"
                                placeholder="Ingres?? tu contrase??a"
                                variant="standard"
                                type="password"
                                fullWidth
                                required
                                style={{ paddingBottom: "0.5em" }}
                                disabled={!enableEdit}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <TextField
                                label="Repite contrase??a"
                                placeholder="Repite la contrase??a"
                                variant="standard"
                                type="password"
                                fullWidth
                                required
                                disabled={!enableEdit}
                                value={repPassword}
                                onChange={(e) => setRepPassword(e.target.value)}
                            />
                        </>}
                    </Box>
                    {enableEdit && <Box style={{ display: "flex", justifyContent: "flex-end", marginTop: "1em" }}>
                        <Button variant="contained" color="inherit" onClick={() => setEnableEdit(false)} style={{ marginRight: "1em" }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleUpdateData}>
                            Guardar cambios
                        </Button>
                    </Box>}
                </Paper>
            </Grid>
        </Grid>
    )
}
export default EditDataComponent;