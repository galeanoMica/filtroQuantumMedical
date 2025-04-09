import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
//import Country from "./Country";
import Medico from "./Medicos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

//
// interface CardCountryProps {
//   country: Country;
// }
interface CardMedicsProps {
  medico: Medico;
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
//
// export default function CardCountry({ country }: CardCountryProps) {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//   return (
//     <Card>
//       <CardHeader title={country.name}></CardHeader>
//       <CardMedia
//         component="img"
//         alt={country.name}
//         height="140"
//         image={country.flags.png}
//       />

//       <CardActions disableSpacing>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="ver más"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography
//             sx={{ marginBottom: 2 }}
//             variant="body2"
//           >{`Nombre Nativo: ${country.nativeName}`}</Typography>
//           <Typography
//             sx={{ marginBottom: 2 }}
//             variant="body2"
//           >{`alpha3Code: ${country.alpha3Code}`}</Typography>
//           <Typography
//             sx={{ marginBottom: 2 }}
//             variant="body2"
//           >{`Capital: ${country.capital}`}</Typography>
//           <Typography
//             sx={{ marginBottom: 2 }}
//             variant="body2"
//           >{`Poblacion: ${country.population}`}</Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }

export default function CardMedic({ medico }: CardMedicsProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>
      <CardHeader title={medico.apellido} subheader={medico.especialidad}></CardHeader>
      {/* <CardMedia
        component="img"
        alt={}
        height="140"
        image={}
      /> */}

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="ver más"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`Nombre : ${medico.nombre}`}</Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`Apellido: ${medico.apellido}`}</Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`Especialidad: ${medico.especialidad}`}</Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`Días de atención: ${medico.horario.dia.join(", ")}`}</Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`Horario: ${medico.horario.horario}`}</Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2">
              Contacto: <br />
                - Email: {medico.contacto.email} <br />
                - Teléfono: {medico.contacto.telefono}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expand", // Evita que 'expand' se pase al DOM
})<ExpandMoreProps>(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)", // Se usa 'expand' aquí
}));
