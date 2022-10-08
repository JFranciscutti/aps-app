import { Button, createStyles, Grid, Link, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserLogin } from "../models/User";
import UserService from "../services/UserService";
import { Routes } from "../utils/Routes";
import LoginTitle from "./LoginTitle";

const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

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
    const classes = useStyles();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [validEmail, setValidEmail] = useState<ValidState>(initialState);
    const [validPassword, setValidPassword] = useState<ValidState>(initialState);

    useEffect(() => {
        setValidEmail({ valid: true, msg: "" });
        setValidPassword({ valid: true, msg: "" });
    }, [])

    const handleCreateAccount = () => {
        history.push(Routes.SIGNUP)
    }

    const validateEmail = () => {
        if (email.match(emailRegExp)) {
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
    }

    const handleLogin = () => {
        validateFields();

        if (validEmail.valid && validPassword.valid) {
            let data: UserLogin = { email: email, password: password }
            UserService.login(data).then((response: any) => {
                history.push({ pathname: Routes.HOME, state: { user: response.data } })
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('password', response.data.password)
            }).catch((error: any) => {
                console.log(error);
                alert("Error al iniciar sesión")
            })
        }
    }

    return (
        <Grid className={classes.mainContainer}>
            <Paper elevation={10} className={classes.paperContainer}>
                <LoginTitle />
                <TextField
                    label="E-mail"
                    placeholder="Ingresá tu e-mail"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!validEmail.valid}
                    helperText={validEmail.msg}
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
                    error={!validPassword}
                    helperText={validPassword.msg}
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
        padding: "1em",
        height: window.innerHeight * 0.7,
        width: "30%",
        margin: "2% auto"
    }
}));