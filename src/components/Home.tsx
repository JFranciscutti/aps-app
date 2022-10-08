import { Box, Grid, Paper, Typography, makeStyles, createStyles, IconButton } from "@material-ui/core"
import { CircleRounded, LogoutOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../models/User";
import UserService from "../services/UserService";
import { Routes } from "../utils/Routes";
import MainComponent from "./MainComponent";

const Home = () => {


    const history = useHistory();

    const classes = useStyles();

    const [loggedUser, setLoggedUser] = useState<User>();

    useEffect(() => {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        if (!!email && !!password) {
            UserService.getByEmailAndPassword(email, password).then((response: any) => {
                setLoggedUser(response.data);
            });

        }
    }, []);

    const handleSignOut = () => {
        localStorage.clear();
        history.push(Routes.LOGIN);
    }

    return (
        <Grid >
            <Paper className={classes.paperContainer}>
                <Grid className={classes.topBarContainer}>
                    <Box style={{ display: "flex" }}>
                        <Typography variant="h4" style={{ fontFamily: "cursive", fontWeight: "bold" }}>SIU GUARANI</Typography>
                        <Typography variant="h6" style={{ fontFamily: "cursive", paddingTop: "0.7em" }}>v2</Typography>
                    </Box>
                    <Box style={{ display: "flex" }}>
                        <Box className={classes.userNameBox}>
                            <Typography>
                                {`${loggedUser?.role} ${loggedUser?.firstName} ${loggedUser?.lastName}`}
                            </Typography>
                            <CircleRounded style={{ color: "#38ff00", height: "0.5em" }} />
                        </Box>
                        <IconButton onClick={handleSignOut}>
                            <LogoutOutlined />
                        </IconButton>
                    </Box>

                </Grid>
            </Paper>
            <MainComponent user={loggedUser} />
        </Grid>
    )
}

export default Home;

const useStyles = makeStyles((theme: any) => createStyles({
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
    paperContainer: {
        width: "100%",
        height: 80,
        backgroundColor: "white"
    },
    topBarContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%",
        alignItems: "center",
        padding: "0 2em"
    },
    userNameBox: {
        display: "flex",
        marginRight: "2em",
        alignItems: "center"
    }
}));