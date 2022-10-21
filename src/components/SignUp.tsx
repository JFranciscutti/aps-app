import { Avatar, Box, Button, createStyles, FormControl, FormControlLabel, FormLabel, Grid, Link, makeStyles, Paper, Radio, RadioGroup, TextField, Typography } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../models/User";
import UserService from "../services/UserService";
import { Roles } from "../utils/Roles";
import { Routes } from "../utils/Routes";
import LoginTitle from "./LoginTitle";

const initialUser: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: Roles.ALUMNO,
}

const SignUp = () => {

    const history = useHistory();
    const classes = useStyles();

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
            UserService.createUser(finalUser).then((response: any) => {
                alert("Usuario creado correctamente");
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('password', response.data.password)
                history.push({ pathname: Routes.HOME, state: { user: response.data } })
            }).catch((error: any) => {
                console.log(error);
            })
        }
    }

    return (
        <Grid className={classes.mainContainer}>
            <Paper elevation={10} className={classes.paperContainer}>
                <LoginTitle />
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

                <FormControl className={classes.radioGroupContainer}>
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
                        <Box className={classes.column}>
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

const useStyles = makeStyles((theme: any) => createStyles({
    mainContainer: {
        textAlign: "center",
        backgroundColor: "#D5D6D8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(10px + 2vmin)"
    },
    paperContainer: {
        padding: 20,
        height: window.innerHeight * 0.8,
        width: "30%",
        margin: "20px auto"
    },
    radioGroupContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5em 0"
    },
    column: {
        display: "flex",
        flexDirection: "column"
    }
}));