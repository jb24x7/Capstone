import React from "react";
import {
  SimpleGrid, Box, Button, Divider, CardFooter, ButtonGroup, Image, Text,
  AspectRatio, VStack, Stack, Flex, Heading, HStack, Link, useColorMode, useColorModeValue as mode,
} from '@chakra-ui/react';

const PurchaseSummary = (props) => {
  const { toggleColorMode } = useColorMode();
  const bgColor = mode('gray.50', 'whiteAlpha.50');
  const secondaryTextColor = mode('gray.600', 'gray.400');

  const { product } = props;
  const currency = "USD";

  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={6}
      align="flex-start"
      bg={bgColor}
    >
      <VStack alignItems="flex-start" spacing={3}>
        <Heading size="2xl">Your cart</Heading>
      </VStack>
      <HStack spacing={6} alignItems="center" w="full">
        <AspectRatio ratio={1} w={24}>
          <Image src={product.imageUrl} />
        </AspectRatio>
        <Stack
          spacing={0}
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack w="full" spacing={0} alignItems="flex-start">
            <Heading size="md">{product.name}</Heading>
            {/* <Text color={secondaryTextColor}>PNYCOMP27541</Text> */}
          </VStack>
          <Heading size="sm" textAlign="end">
            ${product.price}
          </Heading>
        </Stack>
      </HStack>
      <VStack spacing={4} alignItems="stretch" w="full">
        <HStack justifyContent="space-between">
        </HStack>
      </VStack>
      <Divider />
      <HStack justifyContent="space-between" w="full" mt={4}>
        <Text color={secondaryTextColor}>Total (Plus Tax)</Text>
        <Text>${product.price * 1.03}</Text>
      </HStack>
    </VStack>
  );
};

export default PurchaseSummary;
