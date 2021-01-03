import React from "react";
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuDivider,
  MenuItemOption,
  Center,
} from "@chakra-ui/react";

function Filter(props) {
  // get every unique sub
  const subs = [...new Set(props.videoList.map((vid) => vid.subreddit_id))];

  const handleChange = (e) => {
    props.setFilterList(e);
  };

  return (
    <Center mb={3}>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          color="#FFF"
          backgroundColor="#FFA51E"
          _hover={{ bg: "#FF7C1E" }}
          _active={{
            bg: "#FF7C1E",
          }}
        >
          Filters
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup
            defaultValue="all"
            title="View Saved Only?"
            type="radio"
          >
            <MenuItemOption value="saved">
              Show videos saved in my account
            </MenuItemOption>
            <MenuItemOption value="all">Show every video</MenuItemOption>
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup
            title="Filter videos by subreddit"
            type="checkbox"
            onChange={handleChange}
          >
            {subs.map((id) => {
              return (
                <MenuItemOption value={id} key={id}>
                  {id}
                </MenuItemOption>
              );
            })}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Center>
  );
}

export default Filter;
