import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Checkbox,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { useMemo, useState } from "react";
import Medico from "./Medicos";

type FilterFunction = (c: Medico) => boolean;

interface FilterMedicalProps {
  onFilterChange: (_: FilterFunction[]) => void;
  especialtiesOptions: string[];
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FilterMedical({
  onFilterChange,
  especialtiesOptions,
}: FilterMedicalProps) {
  const [selectedFilter, setSelectedFilter] = useState<string[]>(["Todos"]);

  const filters = useMemo(
    () =>
      especialtiesOptions.reduce<Record<string, (c: Medico) => boolean>>(
        (acc, especialidad) => {
          acc[especialidad] = (c: Medico) =>
            c.especialidad === (especialidad === "Todos" ? c.especialidad : especialidad);
          return acc;
        },
        {}
      ),

    [especialtiesOptions]
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedFilter>) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === "string" ? value.split(",") : value;
    setSelectedFilter(values);

    onFilterChange(
      values
        .map((key) => filters[key as keyof typeof filters])
        .filter((value) => !!value)
    );
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="filter-simple-select-label" shrink>
          Filtro por Especialidad
        </InputLabel>
        <Select
          label="Filtros"
          labelId="filter-simple-select-label"
          id="filter-simple-select"
          multiple
          value={selectedFilter}
          onChange={handleChange}
          input={<OutlinedInput label="Filtro por Especialidad" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {especialtiesOptions.map((each: string) => (
            <MenuItem key={each} value={each}>
              <Checkbox checked={selectedFilter.includes(each)} />
              <ListItemText primary={each} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
