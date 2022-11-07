import { Box, Grid, Paper, Typography, makeStyles, createStyles, IconButton } from "@material-ui/core"
import { Menu } from "@material-ui/icons";
import { CircleRounded, LogoutOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../models/User";
import UserService from "../services/UserService";
import { Routes } from "../utils/Routes";
import FooterComponent from "./FooterComponent";
import MainComponent from "./MainComponent";

const Home = () => {

    const history = useHistory();

    const classes = useStyles();

    const [loggedUser, setLoggedUser] = useState<User>();

    const [openBar, setOpenBar] = useState<boolean>(window.innerWidth >= 960);

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
                    <Box>
                        <IconButton onClick={()=> setOpenBar(!openBar)}>
                            <Menu/>
                        </IconButton>
                    </Box>
                    <Box className={classes.logoBox}>
                        <Box style={{ display: "flex" }}>
                            <Typography style={{ fontFamily: "cursive", fontWeight: "bold", fontSize: "100%" }}>SIU GUARANI</Typography>
                            <Typography style={{ fontFamily: "cursive", paddingTop: "0.7em", fontSize: "100%" }}>v2</Typography>
                        </Box>
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
            <MainComponent user={loggedUser} openBar={openBar}/>
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
        padding: "0 2em",
    },
    userNameBox: {
        display: "flex",
        marginRight: "2em",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
    },
    logoBox: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#93B8F5",
        padding: "0 0.5em",
        borderRadius: 6,
        border: "1px solid black",
        [theme.breakpoints.down("sm")]: {
            height: "60%",
        },
    },
}));