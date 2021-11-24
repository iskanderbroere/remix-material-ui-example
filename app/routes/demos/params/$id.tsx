import { Box, Chip, Typography } from "@mui/material";
import { ReactNode } from "react";
import type { LoaderFunction, MetaFunction } from "remix";
import { json, useCatch, useLoaderData } from "remix";

// The `$` in route filenames becomes a pattern that's parsed from the URL and
// passed to your loaders so you can look up data.
// - https://remix.run/api/conventions#loader-params
export let loader: LoaderFunction = async ({ params }) => {
  // pretend like we're using params.id to look something up in the db

  if (params.id === "this-record-does-not-exist") {
    // If the record doesn't exist we can't render the route normally, so
    // instead we throw a 404 reponse to stop running code here and show the
    // user the catch boundary.
    throw new Response("Not Found", { status: 404 });
  }

  // now pretend like the record exists but the user just isn't authorized to
  // see it.
  if (params.id === "shh-its-a-secret") {
    // Again, we can't render the component if the user isn't authorized. You
    // can even put data in the response that might help the user rectify the
    // issue! Like emailing the webmaster for access to the page. (Oh, right,
    // `json` is just a Response helper that makes it easier to send JSON
    // responses).
    throw json({ webmasterEmail: "hello@remix.run" }, { status: 401 });
  }

  // Sometimes your code just blows up and you never anticipated it. Remix will
  // automatically catch it and send the UI to the error boundary.
  if (params.id === "kaboom") {
    lol();
  }

  // but otherwise the record was found, user has access, so we can do whatever
  // else we needed to in the loader and return the data. (This is boring, we're
  // just gonna return the params.id).
  return { param: params.id };
};

export default function ParamDemo() {
  let data = useLoaderData();
  return (
    <Typography component="h1" gutterBottom>
      The param is{" "}
      <Box
        component="i"
        sx={{
          color: "error.main",
        }}
      >
        {data.param}
      </Box>
    </Typography>
  );
}

// https://remix.run/api/conventions#catchboundary
// https://remix.run/api/remix#usecatch
// https://remix.run/api/guides/not-found
export function CatchBoundary() {
  let caught = useCatch();

  let message: ReactNode;
  switch (caught.status) {
    case 401:
      message = (
        <Typography paragraph>
          Looks like you tried to visit a page that you do not have access to.
          Maybe ask the webmaster ({caught.data.webmasterEmail}) for access.
        </Typography>
      );
    case 404:
      message = (
        <Typography paragraph>
          Looks like you tried to visit a page that does not exist.
        </Typography>
      );
    default:
      message = (
        <>
          <Typography paragraph>
            There was a problem with your request!
          </Typography>
          <Chip
            sx={{
              mb: 2,
            }}
            label={`${caught.status} ${caught.statusText}`}
            color="error"
            variant="outlined"
          />
        </>
      );
  }

  return (
    <>
      <Typography component="h2" variant="h5" gutterBottom>
        Oops!
      </Typography>
      {message}
      <Typography>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </Typography>
    </>
  );
}

// https://remix.run/api/conventions#errorboundary
// https://remix.run/api/guides/not-found
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <>
      <Typography component="h2" variant="h5" gutterBottom>
        Error!
      </Typography>
      <Typography gutterBottom>{error.message}</Typography>
      <Typography>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </Typography>
    </>
  );
}

export let meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : "Oops...",
  };
};
