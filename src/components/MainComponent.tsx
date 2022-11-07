import { Button, createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { User } from "../models/User";
import UserService from "../services/UserService";
import { useHistory } from "react-router-dom";
import EditDataComponent from "./EditDataComponent";
import { Roles } from "../utils/Roles";
import NotasComponent from "./alumno/NotasComponent";
import MateriasComponent from "./admin/MateriasComponent";
import ProfesoresComponent from "./admin/ProfesoresComponent";
import AlumnosComponent from "./admin/AlumnosComponent";
import ExamenesComponent from "./profesor/ExamenesComponent";
import ExamenesAlumnoComponent from "./alumno/ExamenesAlumnoComponent";
import LateralBar from "./LateralBar";
import FooterComponent from "./FooterComponent";

interface Props {
    user?: User;
    openBar: boolean;
}


const useStyles = makeStyles((theme: any) => createStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "85%",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            margin: "0 10%"
        },
    }
}));

const ALUMNO_OPTIONS = [
    "Mis datos",
    "Mis notas",
    "Inscripción a examenes"
];

const PROFESOR_OPTIONS = [
    "Mis datos",
    "Examenes",
];

const ADMIN_OPTIONS = [
    "Mis datos",
    "Materias",
    "Alumnos",
    "Profesores",
];

const MainComponent = ({ user, openBar }: Props) => {

    const history = useHistory();

    const [currentUser, setCurrentUser] = useState<User | undefined>(user);

    const [options, setOptions] = useState<string[]>(ALUMNO_OPTIONS);

    const [selectedOption, setSelectedOption] = useState<string>(options[0]);

    const classes = useStyles();

    useEffect(() => {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        if (!!email && !!password) {
            UserService.getByEmailAndPassword(email, password).then((response: any) => {
                setCurrentUser(response.data);
                roleSwitch(response.data.role)

            })
        }
    }, []);

    const roleSwitch = (role: Roles) => {
        switch (role) {
            case Roles.ALUMNO: setOptions(ALUMNO_OPTIONS); break;
            case Roles.PROFESOR: setOptions(PROFESOR_OPTIONS); break;
            case Roles.ADMIN: setOptions(ADMIN_OPTIONS); break;
            default: break;
        }
    }

    const handleSelectedOption = (label: string) => {
        setSelectedOption(label);
    }

    return (
        <Grid container>
            <LateralBar open={openBar} handleSelectedOption={handleSelectedOption} options={options} />
            <Grid item className={classes.container}>
                {selectedOption === "Mis datos" && <EditDataComponent user={user} />}
                {selectedOption === "Mis notas" && user?.role === Roles.ALUMNO && (<NotasComponent />)}
                {selectedOption === "Inscripción a examenes" && user?.role === Roles.ALUMNO && (<ExamenesAlumnoComponent user={user} />)}
                {selectedOption === "Examenes" && user?.role === Roles.PROFESOR && (<ExamenesComponent user={user} />)}
                {selectedOption === "Materias" && user?.role === Roles.ADMIN && (<MateriasComponent />)}
                {selectedOption === "Alumnos" && user?.role === Roles.ADMIN && (<AlumnosComponent />)}
                {selectedOption === "Profesores" && user?.role === Roles.ADMIN && (<ProfesoresComponent />)}
            </Grid>
            <FooterComponent />
        </Grid>
    )
}

export default MainComponent;