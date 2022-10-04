import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserLogin } from "../models/User";
import UserService from "../services/UserService";
import { Routes } from "../utils/Routes";

const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

interface ValidState {
    valid: boolean;
    msg: string;
}

const initialState: ValidState = {
    valid: false,
    msg: ""
}

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [validEmail, setValidEmail] = useState<ValidState>(initialState);
    const [validPassword, setValidPassword] = useState<ValidState>(initialState);

    const handleCreateAccount = () => {
        history.push(Routes.SIGNUP)
    }

    const validateEmail = () => {
        if (email.match(regexp)) {
            setValidEmail({ valid: true, msg: "" });
        } else {
            setValidEmail({ valid: false, msg: "E-mail invalido" })
        }
    }

    const validatePassword = () => {
        if (password.length >= 6) {
            setValidPassword({ valid: true, msg: "" });
        } else {
            setValidPassword({ valid: false, msg: "Contraseña invalida" })
        }
    }

    const validateFields = () => {
        validateEmail();
        validatePassword();
        return validEmail.valid && validPassword.valid;
    }

    const handleLogin = () => {
        if (validateFields()) {
            let data: UserLogin = { email: email, password: password }
            UserService.login(data).then((response: any) => {
                history.push({ pathname: Routes.HOME, state: { user: response.data } })
            })
        }
    }

    return (
        <Grid style={{ textAlign: "center", backgroundColor: "#D5D6D8", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "calc(10px + 2vmin)" }}>
            <Paper elevation={10} style={{ padding: "1em", height: window.innerHeight * 0.7, width: "30%", margin: "2% auto" }}>
                <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "1em" }}>
                    <Avatar style={{ backgroundColor: "#1BBD7E" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">¡Bienvenido a SIU Guarani v2!</Typography>
                </Grid>
                <TextField
                    label="E-mail"
                    placeholder="Ingresá tu e-mail"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Contraseña"
                    placeholder="Ingresá tu contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={{ margin: "8px 0" }}
                    fullWidth
                    onClick={handleLogin}
                >
                    Iniciar sesion
                </Button>
                <Typography >
                    <Link href="#" >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Typography>
                <Typography > ¿No tenes una cuenta?
                    <Link href="#" onClick={handleCreateAccount} >
                        ¡Creala acá!
                    </Link>
                </Typography>

            </Paper>
        </Grid>
    )
}

export default Login