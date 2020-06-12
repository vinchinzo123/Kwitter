import React, { useEffect } from "react";
import "./Messages.css";

import { Avatar, Box, Grommet } from "grommet";
import { grommet } from "grommet/themes";

export const Messages = (props) => {
  console.log({ props });
  useEffect(() => {
    props.getMessagesList();
  }, []);

  return (
    <Grommet theme={grommet}>
      <Box border pad="medium" elevation="medium" className="messagesList" style={{maxWidth:"710px"} } >
        {props.messsages !== [] &&
          props.messages.map((message) => (
            <Box border pad="medium" elevation="medium" className="message">
            <Avatar className="AvatarImg" src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
            {message.username}
            {message.text} 
            </Box>
        ))}
      <textarea rows="4" cols="20" />
      
      </Box>
    </Grommet>
  );
};

export default Messages;
