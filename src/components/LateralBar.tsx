import { Button, Grid, Typography, makeStyles, createStyles } from "@material-ui/core"

const useStyles = makeStyles((theme: any) => createStyles({
    lateralBar: {
        display: "flex",
        flexDirection: "column",
        width: "15%",
        borderRight: "1px solid gray",
        [theme.breakpoints.down("sm")]: {
            width:"100%",
        },
    }
}));

interface Props {
    open: boolean;
    handleSelectedOption: (label: string) => void;
    options: string[];
}

const LateralBar = ({ open, handleSelectedOption, options }: Props) => {

    const classes = useStyles();

    const actionButton = (label: string) => {
        return (
            <Button
                onClick={() => handleSelectedOption(label)}
                variant="contained"
                style={{ display: "flex", justifyContent: "center", padding: "1em 0" }}
            >
                <Typography variant="button">{label}</Typography>
            </Button>
        )
    }

    return (
        open
            ? <Grid item className={classes.lateralBar} >
                {options.map((option) => { return actionButton(option) })}
            </Grid >
            : <></>
    )
}

export default LateralBar;