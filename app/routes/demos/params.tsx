import { Box, Link, Typography } from "@mui/material";
import { Link as RemixLink, Outlet } from "remix";
import { styled } from "@mui/system";

export function meta() {
  return { title: "Boundaries Demo" };
}

const remixPage = {
  display: "grid",
  gridAutoRows: ["min-content", "unset"],
  gridTemplateColumns: [null, "repeat(2, 1fr)"],
  gap: [2, 4, 8],
  paddingY: 4,
};

export default function Boundaries() {
  return (
    <Box sx={remixPage}>
      <Box
        component="main"
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <Outlet />
      </Box>
      <Box component="aside" sx={{ p: 2 }}>
        <Typography variant="h5" component="h2">
          Click these Links
        </Typography>
        <ul>
          <li>
            <Link component={RemixLink} to="." color="primary">
              Start over
            </Link>
          </li>
          <li>
            <Link component={RemixLink} to="one">
              Param: <i>one</i>
            </Link>
          </li>
          <li>
            <Link component={RemixLink} to="two">
              Param: <i>two</i>
            </Link>
          </li>
          <li>
            <Link component={RemixLink} to="this-record-does-not-exist">
              This will be a 404
            </Link>
          </li>
          <li>
            <Link component={RemixLink} to="shh-its-a-secret">
              And this will be 401 Unauthorized
            </Link>
          </li>
          <li>
            <Link component={RemixLink} to="kaboom">
              This one will throw an error
            </Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
}
