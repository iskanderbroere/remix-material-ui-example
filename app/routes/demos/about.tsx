import { Outlet } from "remix";
import type { MetaFunction, LinksFunction } from "remix";
import { Box, Divider, Link, Typography } from "@mui/material";

export let meta: MetaFunction = () => {
  return {
    title: "About Remix",
  };
};

export default function Index() {
  return (
    <Box
      sx={{
        py: 4,
        maxWidth: 500,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        About Us
      </Typography>
      <Typography paragraph>
        Ok, so this page isn't really <em>about us</em>, but we did want to show
        you a few more things Remix can do, like displaying this route and its
        children.
      </Typography>
      <Typography paragraph>
        Wait a sec...<em>its children</em>? To understand what we mean by this,{" "}
        <Link href="https://remix.run/docs/en/v1/guides/routing">
          read all about nested routes in the docs
        </Link>
        .
      </Typography>
      <Divider />
      <Outlet />
    </Box>
  );
}
