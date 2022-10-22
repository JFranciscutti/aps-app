import { Button, Grid, Typography } from "@material-ui/core";
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

interface Props {
    user?: User;
}

const ALUMNO_OPTIONS = [
    "Mis datos",
    "Mis notas",
    "Inscripción a cursadas",
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

const MainComponent = ({ user }: Props) => {

    const history = useHistory();

    const [currentUser, setCurrentUser] = useState<User | undefined>(user);

    const [options, setOptions] = useState<string[]>(ALUMNO_OPTIONS);

    const [selectedOption, setSelectedOption] = useState<string>(options[0]);

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

    const actionButton = (label: string) => {
        return (
            <Button
                onClick={() => setSelectedOption(label)}
                variant="contained"
                style={{ display: "flex", justifyContent: "center", padding: "1em 0" }}
            >
                <Typography variant="button">{label}</Typography>
            </Button>
        )
    }

    const LateralBar = () => (
        <Grid item style={{ display: "flex", flexDirection: "column", width: "15%", borderRight: "1px solid gray" }}>
            {options.map((option) => { return actionButton(option) })}
        </Grid>
    )

    const roleSwitch = (role: Roles) => {
        switch (role) {
            case Roles.ALUMNO: setOptions(ALUMNO_OPTIONS); break;
            case Roles.PROFESOR: setOptions(PROFESOR_OPTIONS); break;
            case Roles.ADMIN: setOptions(ADMIN_OPTIONS); break;
            default: break;
        }
    }

    return (
        <Grid container>
            <LateralBar />
            <Grid item style={{ display: "flex", flexDirection: "column", width: "85%" }}>
                {selectedOption === "Mis datos" && <EditDataComponent user={user} />}
                {selectedOption === "Mis notas" && user?.role === Roles.ALUMNO && (<NotasComponent />)}
                {selectedOption === "Examenes" && user?.role === Roles.PROFESOR && (<NotasComponent />)}
                {selectedOption === "Materias" && user?.role === Roles.ADMIN && (<MateriasComponent />)}
                {selectedOption === "Alumnos" && user?.role === Roles.ADMIN && (<AlumnosComponent />)}
                {selectedOption === "Profesores" && user?.role === Roles.ADMIN && (<ProfesoresComponent />)}
            </Grid>
        </Grid>
    )
}

export default MainComponent;