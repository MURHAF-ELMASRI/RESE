import { Icon } from "@iconify/react";
import { IconButton, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {
  FreeService,
  PaidService,
  PitchType,
} from "@rese/client-server/model/pitchModel";
import { FormikHandlers, useFormik } from "formik";

interface InitialValue {
  name: string;
  location: string;
  date: Date | undefined;
  services: FreeService & PaidService[];
}

interface Props {
  isOpen: boolean;
  allPitches: PitchType[];
  onClose: () => void;
  onFilter: (filteredData: PitchType[]) => void;
}
//TODO save longitude and latitude and make search filter according to a circle with 5km radius

export default function Filter(props: Props) {
  const { onClose } = props;
  const classes = useStyles();
  const formik = useFormik<InitialValue>({
    initialValues: {
      name: "",
      location: "",
      date: undefined,
      services: [] as FreeService & PaidService,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography className={classes.title}>Filter</Typography>
        <IconButton onClick={onClose}>
          <Icon
            icon="mdi:close"
            width={20}
            height={20}
            className={classes.closeIcon}
          />
        </IconButton>
      </div>

      <TextFiledWithIcon name="name" onChange={formik.handleChange} />
      <TextFiledWithIcon
        name="location"
        onChange={formik.handleChange}
        icon="mdi:map-marker-radius"
      />

      <TextFiledWithIcon
        name="date"
        onChange={formik.handleChange}
        icon="mdi:heart-plus-outline"
      />
    </div>
  );
}
interface TextFiledProps {
  icon?: string;
  onChange: FormikHandlers["handleChange"];
  name: string;
}

function TextFiledWithIcon(props: TextFiledProps) {
  const { icon, onChange, name } = props;
  const classes = useStyles();
  return (
    <TextField
      name={name}
      onChange={onChange}
      className={classes.textField}
      variant="outlined"
      label={name}
      InputProps={{
        endAdornment: icon && (
          <InputAdornment position="end">
            <Icon icon={icon} width={20} className={classes.icon} />
          </InputAdornment>
        ),
      }}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 28,
    backgroundColor: theme.palette.primary.main,
    width: "100vw",
    maxWidth: 502,
    gap: 16,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: theme.palette.grey[50],
    fontSize: 24,
  },
  textField: {
    width: "100%",
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  closeIcon: {
    color: theme.palette.grey[50],
  },
}));
