import { Box, Button, Grid, Paper, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";

const Home = () => {

    const history = useHistory();

    const handleSignOut = () => {
        history.push("/login");
    }
    return (
        <Grid >
            <Paper style={{ width: window.innerWidth, height: "4em", backgroundColor: "white" }}>
                <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "100%", alignItems: "center", padding: "0 2em" }}>
                    <Box style={{ display: "flex" }}>
                        <Typography variant="h4" style={{ fontFamily: "cursive", fontWeight: "bold" }}>SIU GUARANI</Typography>
                        <Typography variant="h6" style={{ fontFamily: "cursive", paddingTop: "0.7em" }}>v2</Typography>
                    </Box>
                    <Box style={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSignOut}
                        >
                            Cerrar sesion
                        </Button>
                    </Box>
                </Grid>
            </Paper>
            <Grid>
                <Typography>Proximamente</Typography>
            </Grid>
        </Grid>
    )
}

export default Home;