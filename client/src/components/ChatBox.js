import React, { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button, Comment, Form, Segment } from "semantic-ui-react";

export default function ChatBox() {
  useEffect(() => {
    var objDiv = document.getElementById("scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, []);

  return (
    <Comment.Group>
      <Segment id="scroll" style={{ overflow: "auto", maxHeight: "80%" }}>
        <Comment>
          <Comment.Avatar
            as="a"
            src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
          />
          <Comment.Content>
            <Comment.Author>Joe Henderson</Comment.Author>
            <Comment.Metadata>
              <div>1 day ago</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>
                The hours, minutes and seconds stand as visible reminders that
                your effort put them all there.
              </p>
              <p>
                Preserve until your next run, when the watch lets you see how
                Impermanent your efforts are.
              </p>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>

        <Comment>
          <Comment.Avatar
            as="a"
            src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
          />
          <Comment.Content>
            <Comment.Author>Christian Rocha</Comment.Author>
            <Comment.Metadata>
              <div>2 days ago</div>
            </Comment.Metadata>
            <Comment.Text>I re-tweeted this.</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Segment>
      <Form reply>
        <TextareaAutosize minRows={1} />
        {/* <Form.Input placeholder="type here..." /> */}
        <Button
          style={{ marginTop: "10px" }}
          content="Send"
          labelPosition="left"
          icon="send"
          primary
        />
      </Form>
    </Comment.Group>
  );
}
