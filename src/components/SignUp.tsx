import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Link, Paper, Radio, RadioGroup, TextField, Typography } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../models/User";
import UserService from "../services/UserService";
import { Roles } from "../utils/Roles";
import { Routes } from "../utils/Routes";

const initialUser: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: Roles.ALUMNO,
}

const SignUp = () => {

    const history = useHistory();

    const [user, setUser] = useState<User>(initialUser);
    const [password, setPassword] = useState<string>("");
    const [repPassword, setRepPassword] = useState<string>("");

    const handleLogin = () => {
        history.push(Routes.LOGIN)
    }

    const onSubmit = () => {
        if (password === repPassword) {
            let finalUser = user;
            finalUser.password = password;
            UserService.createUser(user).then((response: any) => {
                alert("Usuario creado correctamente");
                history.push({ pathname: Routes.HOME, state: { user: response.data } })
            }).catch((error: any) => {
                console.log(error);
            })
        }
    }

    return (
        <Grid style={{ textAlign: "center", backgroundColor: "#D5D6D8", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "calc(10px + 2vmin)" }}>
            <Paper elevation={10} style={{ padding: 20, height: window.innerHeight * 0.8, width: "30%", margin: "20px auto" }}>
                <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "1em" }}>
                    <Avatar style={{ backgroundColor: "#1BBD7E" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">¡Bienvenido a SIU Guarani v2!</Typography>
                </Grid>
                <TextField
                    label="Nombre"
                    placeholder="Ingresá tu nombre"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
                <TextField
                    label="Apellido"
                    placeholder="Ingresá tu apellido"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />

                <TextField
                    label="E-mail"
                    placeholder="Ingresá tu e-mail"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <TextField
                    label="Contraseña"
                    placeholder="Ingresá tu contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                    label="Repite contraseña"
                    placeholder="Repite la contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    required
                    value={repPassword}
                    onChange={(e) => setRepPassword(e.target.value)}
                />

                <FormControl style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "0.5em 0" }}>
                    <FormLabel>Soy: </FormLabel>
                    <RadioGroup
                        onChange={(e) => setUser({ ...user, role: e.target.value as Roles })}
                        row
                        defaultValue={user.role}
                        defaultChecked
                        style={{ marginLeft: "1em" }}
                    >
                        <FormControlLabel value={Roles.PROFESOR} control={<Radio />} label="Profesor" />
                        <FormControlLabel value={Roles.ALUMNO} control={<Radio />} label="Alumno" />
                    </RadioGroup>
                </FormControl>

                {
                    user.role === Roles.PROFESOR && (
                        <Box style={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="subtitle1">Ingrese codigo de seguridad brindado por su institución</Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="password"
                                label="Código de seguridad"
                                placeholder="Código de seguridad"
                                style={{ margin: "0.3em 0" }}
                            />
                        </Box>
                    )
                }

                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={{ margin: "8px 0" }}
                    fullWidth
                    onClick={onSubmit}
                >
                    Crear cuenta
                </Button>

                <Typography > ¿Ya tenes una cuenta?
                    <Link href="#" onClick={handleLogin}>
                        Inicia sesion
                    </Link>
                </Typography>

            </Paper>
        </Grid>
    )
}

export default SignUp;