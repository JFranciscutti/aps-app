import { Grid, List, ListItemText, Paper } from "@material-ui/core";
import { ListItem, ListItemButton } from "@mui/material";


const MainComponent = () => {

    const ALUMNO_OPTIONS = ["Mi Perfil", "Mi plan", "Inscripcion a cursadas", "Inscripcion a examenes"];

    return (
        <Grid >
            <Paper style={{ marginTop: "2px", height: window.innerHeight - 82, width: 240, backgroundColor: "white", }}>
                <List>
                    {
                        ALUMNO_OPTIONS.map((option) => {
                            return (
                                <ListItem onClick={() => alert("esa")}>
                                    <ListItemButton>
                                        <ListItemText primary={option} />
                                    </ListItemButton>
                                </ListItem>)
                        })
                    }

                </List>
            </Paper>
        </Grid>
    )
}

export default MainComponent;