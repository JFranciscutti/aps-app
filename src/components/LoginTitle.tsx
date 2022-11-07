import { Avatar, createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

export default function LoginTitle() {
    const classes = useStyles();
    return (
        <Grid className={classes.titleContainer}>
            <Avatar className={classes.avatarColor}>
                <LockOutlined />
            </Avatar>
            <Typography variant="h5">¡Bienvenido a SIU Guarani v2!</Typography>
            <Typography className={classes.mobileTitle}>Versión móvil, exclusiva para alumnos</Typography>
        </Grid>
    );
}

const useStyles = makeStyles((theme: any) => createStyles({
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "1em",
    },
    mobileTitle: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
        },
    },
    avatarColor: {
        backgroundColor: "#1BBD7E"
    }
}));