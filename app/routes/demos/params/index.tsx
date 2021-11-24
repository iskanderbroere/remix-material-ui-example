import { Link, Typography } from "@mui/material";

export default function Boundaries() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Params
      </Typography>
      <Typography paragraph>
        When you name a route segment with $ like{" "}
        <code>routes/users/$userId.js</code>, the $ segment will be parsed from
        the URL and sent to your loaders and actions by the same name.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Errors
      </Typography>
      <Typography paragraph>
        When a route throws and error in it's action, loader, or component,
        Remix automatically catches it, won't even try to render the component,
        but it will render the route's ErrorBoundary instead. If the route
        doesn't have one, it will bubble up to the routes above it until it hits
        the root.
      </Typography>
      <Typography paragraph>
        So be as granular as you want with your error handling.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Not Found
      </Typography>
      <Typography paragraph>
        (and other{" "}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses">
          client errors
        </Link>
        )
      </Typography>
      <Typography>
        Loaders and Actions can throw a <code>Response</code> instead of an
        error and Remix will render the CatchBoundary instead of the component.
        This is great when loading data from a database isn't found. As soon as
        you know you can't render the component normally, throw a 404 response
        and send your app into the catch boundary. Just like error boundaries,
        catch boundaries bubble, too.
      </Typography>
    </>
  );
}
