import React from "react";
import { Icon, IconButton, Center, ButtonGroup } from "@chakra-ui/react";
import { FiSmile, FiFrown, FiMeh } from "react-icons/fi";

function Ratings() {
  return (
    <Center my={2}>
      <ButtonGroup spacing="10">
        <IconButton
          bg="transparent"
          size={14}
          aria-label="Dislike video"
          icon={<Icon as={FiFrown} boxSize={14} color="#535345" />}
        />
        <IconButton
          bg="transparent"
          size={14}
          aria-label="Skip rating video"
          icon={<Icon as={FiMeh} boxSize={14} color="#535345" />}
        />
        <IconButton
          bg="transparent"
          size={14}
          aria-label="Like video"
          icon={<Icon as={FiSmile} boxSize={14} color="#535345" />}
        />
      </ButtonGroup>
    </Center>
  );
}

export default Ratings;
