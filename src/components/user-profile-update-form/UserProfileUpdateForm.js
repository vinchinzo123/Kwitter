import React, { useState, useEffect } from "react";
import BlankProfile from "../images/blank-profile.png";
import FormData from "form-data";

import { Link } from "react-router-dom";
import "./UserProfileUpdateForm.css";

import { Hide, View } from "grommet-icons";
import { grommet } from "grommet/themes";
import { Box, Button, Grommet, Form, FormField, TextInput } from "grommet";

export const UserProfileUpdateForm = (props) => {
  console.log(props.users.pictureLocation);
  let picture = props.users.pictureLocation;

  const [choice, setChoice] = useState(false);
  const [input, setInput] = useState({
    displayName: "",
    about: "",
    password: "",
  });

  const fileInput = React.createRef();

  useEffect(() => {
    props.getUser(props.profile);
    picture = props.users.pictureLocation;
  }, [choice]);

  const [reveal, setReveal] = useState(false);

  const handleDeleteUser = () => {
    props.deleteUser(props.username);
    props.logout();
  };

  const clickHandler = () => {
    let user = {
      username: props.username,
      requestBody: {
        displayName: input.displayName,
        about: input.about,
        password: input.password,
      },
    };
    props.updateUser(user);
  };

  const changeHandler = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setInput((input) => ({ ...input, [inputName]: inputValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await props.putUserPicture({
      username: props.profile,
      userPicture: formData,
    });
    await setChoice(!choice);
    await console.log(choice);
  };

  return (
    <Grommet full theme={grommet}>
      <Box fill align="baseline">
        <div className="updateProfile">
          <div className="updatePhoto">
            <img
              className="ProfileImg"
              src={
                props.users !== undefined
                  ? "https://kwitter-api.herokuapp.com" + picture
                  : BlankProfile
              }
              alt={picture}
            />
            <form onSubmit={handleSubmit}>
              <label>
                <TextInput type="file" ref={fileInput} name="picture" />
              </label>
              <br />
              <Button type="submit" label="Upload" primary />
            </form>
          </div>
          <div className="updateForm">
          <Form  onSubmit={clickHandler}>
            <Box
              className="textField"
              direction="row"
              align="center"
              round="small"
              border
            >
              <TextInput
                type="text"
                name="displayName"
                value={input.displayName}
                onChange={changeHandler}
                placeholder={props.users.displayName}
              />
            </Box>
            <Box
              className="textField"
              direction="row"
              align="center"
              round="small"
              border
            >
              <TextInput
                type="text"
                name="about"
                value={input.about}
                onChange={changeHandler}
                placeholder={
                  props.users.about === "" ? "add a bio" : props.users.about
                }
              />
            </Box>
            <Box
              className="textField"
              direction="row"
              align="center"
              round="small"
              border
            >
              <TextInput
                type={reveal ? "text" : "password"}
                name="password"
                required
                value={input.password}
                onChange={changeHandler}
                placeholder="enter password to commit changes"
              />
              <Button
                icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                onClick={() => setReveal(!reveal)}
              />
            </Box>
            <Box direction="row" justify="end" margin={{ top: "medium" }}>
              <Link to={`/profiles/${props.username}`}>
                <Button
                  label="Save Changes"
                  primary
                  type="submit"
                  onClick={clickHandler}
                  fill="true"
                />
              </Link>
              </Box>
              <Box direction="row" justify="end" margin={{ top: "medium" }}>
              <Link to={`/`}>
                <Button
                  secondary
                  label="DELETE ACCOUNT"
                  onClick={handleDeleteUser}
                  color="red"
                />
              </Link>
              </Box>
          </Form>
          </div>
        </div>
      </Box>
    </Grommet>
  );
};
