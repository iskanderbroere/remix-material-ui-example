import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import type { ActionFunction } from "remix";
import { Form, json, useActionData, redirect } from "remix";

export function meta() {
  return { title: "Actions Demo" };
}

// When your form sends a POST, the action is called on the server.
// - https://remix.run/api/conventions#action
// - https://remix.run/guides/data-updates
export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let answer = formData.get("answer");

  // Typical action workflows start with validating the form data that just came
  // over the network. Clientside validation is fine, but you definitely need it
  // server side.  If there's a problem, return the the data and the component
  // can render it.
  if (typeof answer !== "string") {
    return json("Come on, at least try!", { status: 400 });
  }

  if (answer !== "egg") {
    return json(`Sorry, ${answer} is not right.`, { status: 400 });
  }

  // Finally, if the data is valid, you'll typically write to a database or send or
  // email or log the user in, etc. It's recommended to redirect after a
  // successful action, even if it's to the same place so that non-JavaScript workflows
  // from the browser doesn't repost the data if the user clicks back.
  return redirect("/demos/correct");
};

export default function ActionsDemo() {
  // https://remix.run/api/remix#useactiondata
  let actionMessage = useActionData<string>();
  let answerRef = useRef<HTMLInputElement>(null);

  // This form works without JavaScript, but when we have JavaScript we can make
  // the experience better by selecting the input on wrong answers! Go ahead, disable
  // JavaScript in your browser and see what happens.
  useEffect(() => {
    if (actionMessage && answerRef.current) {
      answerRef.current.select();
    }
  }, [actionMessage]);

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
      <Box
        component="main"
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Actions!
        </Typography>
        <Typography paragraph>
          This form submission will send a post request that we handle in our
          `action` export. Any route can export an action to handle data
          mutations.
        </Typography>
        <Card method="post" component={Form} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom>
              Post an Action
            </Typography>
            <Typography paragraph>
              <i>What is more useful when it is broken?</i>
            </Typography>
            <TextField
              error={!!actionMessage}
              helperText={actionMessage ?? "Answer the question!"}
              label="Answer"
              name="answer"
              type="text"
              inputRef={answerRef}
            />
          </CardContent>
          <CardActions>
            <Button type="submit">Answer!</Button>
          </CardActions>
        </Card>
      </Box>

      <Box component="aside" sx={{ p: 2 }}>
        <Typography variant="h6" component="h3">
          Additional Resources
        </Typography>
        <ul>
          <li>
            Guide:{" "}
            <Link href="https://remix.run/guides/data-writes">Data Writes</Link>
          </li>
          <li>
            API:{" "}
            <Link href="https://remix.run/api/conventions#action">
              Route Action Export
            </Link>
          </li>
          <li>
            API:{" "}
            <Link href="https://remix.run/api/remix#useactiondata">
              <code>useActionData</code>
            </Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
}
