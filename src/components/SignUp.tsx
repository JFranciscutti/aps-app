import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const SignUp = () => {

    const history = useHistory();

    const handleLogin = () => {
        history.push("/login")
    }

    return (
        <Grid style={{ textAlign: "center", backgroundColor: "#D5D6D8", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "calc(10px + 2vmin)" }}>
            <Paper elevation={10} style={{ padding: 20, height: window.innerHeight * 0.7, width: "30%", margin: "20px auto" }}>
                <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "1em" }}>
                    <Avatar style={{ backgroundColor: "#1BBD7E" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">¡Bienvenido!</Typography>
                </Grid>
                <TextField
                    label="Nombre"
                    placeholder="Ingresá tu nombre"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                />
                <TextField
                    label="Apellido"
                    placeholder="Ingresá tu apellido"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                />

                <TextField
                    label="E-mail"
                    placeholder="Ingresá tu e-mail"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                />

                <TextField
                    label="Contraseña"
                    placeholder="Ingresá tu contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    required
                    style={{ paddingBottom: "0.5em" }}
                />

                <TextField
                    label="Repite contraseña"
                    placeholder="Repite la contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    required
                />

                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={{ margin: "8px 0" }}
                    fullWidth
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