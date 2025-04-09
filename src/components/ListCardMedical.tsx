import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Medico from "./Medicos";
import CardMedical from "./CardMedical";
import Filters from "./Filters";
import { Box, Typography } from "@mui/material";

type FilterFunction = (c: Medico) => boolean;

export default function ListCardMedical() {
  const [cardsData, setCardsData] = useState<Medico[]>([]);
  const [filtros, setFiltros] = useState<FilterFunction[]>([() => true]);
  const [especialidad, especialtiesOptions] = useState<string[]>(["Todos"]);

  const handleFilterChange = (newFilter: FilterFunction[]) => {
    setFiltros(() => newFilter);
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     await fetch("/data/paises.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCardsData(data);
  //         setSubRegiones([
  //           "Todos",
  //           ...new Set<string>(data.map((c: Country) => c.subregion)),
  //         ]);
  //       });
  //   };
  //   getData();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      await fetch("/data/medicos.json")
        .then((response) => response.json())
        .then((data) => {
          setCardsData(data);
          especialtiesOptions([
            "Todos",
            ...new Set<string>(data.map((c: Medico) => c.especialidad)),
          ]);
        });
    };
    getData();
  }, []);
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Filters
          onFilterChange={handleFilterChange}
          especialtiesOptions={especialidad}
        />
        <Typography variant="body2" sx={{ p: 1 }}>
          {`Cantidad ${
            cardsData.filter((c: Medico) =>
              filtros.some((fn: FilterFunction) => fn(c))
            ).length
          }`}{" "}
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {cardsData
          .filter((c: Medico) => filtros.some((fn: FilterFunction) => fn(c)))
          .map((c: Medico) => (
            <Grid key={c.id} size={{ xs: 2, sm: 4, md: 4 }}>
              <CardMedical medico={c}></CardMedical>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
