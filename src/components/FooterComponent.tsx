import { Box, Typography } from "@material-ui/core";

const FooterComponent = () => {
    return (
        <Box style={{ backgroundColor: "#93B8F5", width: "100%", height: "2em", position: "absolute", bottom: 0 }}>
            <Typography style={{ fontSize: "0.5em", paddingLeft: "1em", paddingTop: "0.5em" }}>{`INFO: Toda la información administrativa e institucional se encuentra almacenada en la nube. Se realizan backups periódicos para mantener la seguridad de la información`}</Typography>
            <Typography style={{ fontSize: "0.5em", paddingLeft: "1em" }}>{`Los servidores están funcionando permanentemente. Podes almacenar y consultar información en cualquier momento del día.`}</Typography>
        </Box>
    )
}
export default FooterComponent;