import React from "react";
import { Flex, Box, Heading, Spacer, Button } from "@chakra-ui/react";

function Header() {
  return (
    <Flex p={5} mb={3} backgroundColor="#535345">
      <Box p="2">
        <Heading size="md" color="#FFF">
          Reddit Short Videos
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Button
          backgroundColor="#FFA51E"
          color="#FFF"
          _hover={{ bg: "#FF7C1E" }}
          _active={{ bg: "#FF7C1E" }}
          mr="4"
        >
          Sign Up
        </Button>
        <Button
          backgroundColor="#FFA51E"
          color="#FFF"
          _hover={{ bg: "#FF7C1E" }}
          _active={{ bg: "#FF7C1E" }}
        >
          Log in
        </Button>
      </Box>
    </Flex>
  );
}

export default Header;
