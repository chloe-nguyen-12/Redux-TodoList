import React from "react";
import { Segment, Dimmer, Loader, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Loading = () => {
  return (
    <Segment>
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );
};

export default Loading;
