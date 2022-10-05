import { Avatar, Box, Button, FormControl, Grid, InputAdornment, MenuItem, Paper, Select, Typography, makeStyles } from "@material-ui/core"
import { CSSProperties, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { User } from "../models/User";
import { Routes } from "../utils/Routes";

const Home = () => {

    const avatarStyles: CSSProperties = { fontWeight: "bold", backgroundColor: "#1976d2", height: "3em", width: "3em" };

    const history = useHistory();

    const classes = useStyles();

    const [loggedUser, setLoggedUser] = useState<User>();

    useEffect(() => {
        if (!!history.location.state) {
            //@ts-ignore
            setLoggedUser(history?.location?.state?.user);
        }
    }, [])

    const handleSignOut = () => {
        history.push(Routes.LOGIN);
    }
    return (
        <Grid >
            <Paper style={{ width: "100%", height: "4em", backgroundColor: "white" }}>
                <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "100%", alignItems: "center", padding: "0 2em" }}>
                    <Box style={{ display: "flex" }}>
                        <Typography variant="h4" style={{ fontFamily: "cursive", fontWeight: "bold" }}>SIU GUARANI</Typography>
                        <Typography variant="h6" style={{ fontFamily: "cursive", paddingTop: "0.7em" }}>v2</Typography>
                    </Box>
                    <Box>
                        <Typography>
                            {`Logueado como ${loggedUser?.firstName} ${loggedUser?.lastName}`}
                        </Typography>
                    </Box>
                    <Box>
                        <FormControl>
                            <Select
                                endAdornment={
                                    <InputAdornment position="start" className={classes.selectAdornment} disablePointerEvents={true}>
                                        <Avatar alt="Avatar" style={avatarStyles} />
                                    </InputAdornment>
                                }
                                MenuProps={{ classes: { paper: classes.selectPaper } }}
                                classes={{
                                    root: classes.selectRoot,
                                    icon: classes.icon,
                                }}
                            >
                                <MenuItem onClick={() => alert("eppaaa todavia no")}>{loggedUser?.firstName + " " + loggedUser?.lastName}</MenuItem>
                                <MenuItem onClick={() => alert("coming soon mi pana")}>Editar perfil</MenuItem>
                                <MenuItem onClick={handleSignOut}>Cerrar sesion</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Paper>
            <Grid style={{ display: "flex", height: "100%", backgroundColor: "white" }}>
                <Typography>Proximamente</Typography>
            </Grid>
        </Grid>
    )
}

export default Home;

const useStyles = makeStyles((theme: any) => ({
    menu: {
        display: "flex",
        alignItems: "center"
    },
    menuDropdown: {
        textAlign: "right",
        font: "normal normal normal 0.875em/1.5em Roboto",
        letterSpacing: "0px",
        color: "white",
        opacity: 1,
        backgroundColor: "transparent",
        borderRadius: "5px",
        "&:hover": {
            borderRadius: "5px",
        },
        "&:focus-within": {
            borderRadius: "5px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderRadius: "none"
        },
    },
    selectRoot: {
        color: "blue",
        font: "normal normal normal 0.875em/1.5em Roboto",
        textTransform: "uppercase",
        background: "transparent !important",
    },
    icon: {
        color: "blue",
    },
    selectPaper: {
        backgroundColor: "white",
        borderRadius: "5px",
        textTransform: "uppercase",
        marginTop: "5em",
        "& li": {
            color: "black",
            font: "normal normal normal 0.875em/1.5em",
            letterSpacing: "0.4px",
            width: "100%"
        }
    },
    selectAdornment: {
        position: "absolute",
        right: 0,
        marginRight: "-6px",
        zIndex: 3
    },
}));