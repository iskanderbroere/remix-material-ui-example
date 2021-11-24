import { Alert } from "@mui/material";

export default function NiceWork() {
  return (
    <Alert
      variant="outlined"
      severity="success"
      sx={{
        my: 2,
        maxWidth: 360,
        mx: "auto",
      }}
    >
      You got it right!
    </Alert>
  );
}
