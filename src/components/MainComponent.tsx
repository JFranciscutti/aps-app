import { Grid, List, ListItemText, Paper } from "@material-ui/core";
import { ListItem, ListItemButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { User } from "../models/User";
import { Roles } from "../utils/Roles";
import { OPTIONS_ADMIN, OPTIONS_ALUMNO, OPTIONS_PROFESOR } from "../utils/Options";

interface Props {
    user?: User;
}

const MainComponent = ({ user }: Props) => {

    const currentOptions = useRef<string[]>([]);

    useEffect(() => {
        let role = user?.role?.toLowerCase();
        switch (role) {
            case Roles.ALUMNO:
                currentOptions.current = OPTIONS_ALUMNO;
                break;
            case Roles.PROFESOR:
                currentOptions.current = OPTIONS_PROFESOR;
                break;
            case Roles.ADMIN:
                currentOptions.current = OPTIONS_ADMIN;
                break;
            default: currentOptions.current = [];
        }
    }, [user]);


    return (
        <Grid >
            <Paper style={{ marginTop: "2px", height: window.innerHeight - 82, width: 240, backgroundColor: "white", }}>
                <List>
                    {
                        currentOptions.current.map((value: string) => {
                            return (
                                <ListItem onClick={() => alert("esa")}>
                                    <ListItemButton>
                                        <ListItemText primary={value} />
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