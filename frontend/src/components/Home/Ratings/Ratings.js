import React from "react";
import {
  Icon,
  IconButton,
  Center,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { FiSmile, FiFrown, FiMeh } from "react-icons/fi";

function Ratings() {
  const toast = useToast();
  const userFeedBack = (e) => {
    toast({
      title: `You ${e.currentTarget.id}d this video!`,
      status: "success",
      duration: 8000,
      isClosable: true,
    });
  };

  return (
    <Center my={2}>
      <ButtonGroup spacing="10">
        <IconButton
          id="dislike"
          bg="transparent"
          size={14}
          aria-label="Dislike video"
          icon={<Icon as={FiFrown} boxSize={14} color="#535345" />}
          onClick={userFeedBack}
        />
        <IconButton
          id="skippe"
          bg="transparent"
          size={14}
          aria-label="Skip rating video"
          icon={<Icon as={FiMeh} boxSize={14} color="#535345" />}
          onClick={userFeedBack}
        />
        <IconButton
          id="like"
          bg="transparent"
          size={14}
          aria-label="Like video"
          icon={<Icon as={FiSmile} boxSize={14} color="#535345" />}
          onClick={userFeedBack}
        />
      </ButtonGroup>
    </Center>
  );
}

export default Ratings;
