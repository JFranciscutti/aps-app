import { Button, Grid, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import { Routes } from "../utils/Routes";

const PasswordRecovery = () => {

    const history = useHistory();

    return (
        <Grid >
            <Button onClick={() => history.push(Routes.LOGIN)}>Go back</Button>
            <Typography>Proximamente</Typography>
        </Grid>
    )
}

export default PasswordRecovery;