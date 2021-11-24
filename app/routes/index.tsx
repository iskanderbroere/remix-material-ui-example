import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link as RemixLink } from "remix";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  let data: IndexData = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs",
      },
      {
        name: "React Router Docs",
        url: "https://reactrouter.com/docs",
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d",
      },
    ],
    demos: [
      {
        to: "demos/actions",
        name: "Actions",
      },
      {
        to: "demos/about",
        name: "Nested Routes",
      },
      {
        to: "demos/params",
        name: "URL Params and Error Boundaries",
      },
    ],
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <Box
      sx={{
        display: "grid",
        gridAutoRows: ["min-content", "unset"],
        gridTemplateColumns: [null, "repeat(2, 1fr)"],
        gap: [2, 4, 8],
        paddingY: 4,
      }}
    >
      <Box component="main">
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome to Remix!
        </Typography>
        <Typography paragraph>We're stoked that you're here. 🥳</Typography>
        <Typography paragraph>
          Feel free to take a look around the code to see how Remix does things,
          it might be a bit different than what you’re used to. When you're
          ready to dive deeper, we've got plenty of resources to get you
          up-and-running quickly.
        </Typography>
        <Typography paragraph>
          Check out all the demos in this starter, and then just delete the{" "}
          <code>app/routes/demos</code> and <code>app/styles/demos</code>{" "}
          folders when you're ready to turn this into your next project.
        </Typography>
      </Box>
      <Card component="aside">
        <CardContent>
          <List
            sx={{ width: "100%" }}
            component="nav"
            aria-labelledby="demos-in-this-app-subheader"
            subheader={
              <ListSubheader component="h2" id="demos-in-this-app-subheader">
                Demos In This App
              </ListSubheader>
            }
          >
            {data.demos.map((demo) => (
              <ListItemButton
                key={demo.to}
                to={demo.to}
                prefetch="intent"
                component={RemixLink}
              >
                <ListItemText primary={demo.name} />
              </ListItemButton>
            ))}
          </List>
          <List
            sx={{ width: "100%" }}
            component="nav"
            aria-labelledby="resources-subheader"
            subheader={
              <ListSubheader component="h2" id="resources-subheader">
                Resources
              </ListSubheader>
            }
          >
            {data.resources.map((resource) => (
              <ListItemButton
                key={resource.url}
                href={resource.url}
                component="a"
              >
                <ListItemText primary={resource.name} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
