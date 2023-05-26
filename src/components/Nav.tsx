import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Stack,
  useColorMode,
  Text,
  Icon
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsWallet } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { useWallet } from "@solana/wallet-adapter-react";

import dynamic from "next/dynamic";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);



export const Nav = () => {
  const [icon, setIcon] = useState();
  const { setVisible } = useWalletModal();

  const { connected } = useWallet();

  const handleConnect = () => {
    setVisible(true);
  };

  return (
    <>
      <Box bg="rgba(186,176,227,0.6)" width="80%" px={4} borderRadius={40}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Avatar
              size={"md"}
              src={"/logo.png"}
            />
          </Box>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Underdog Protocol
          </Text>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button backgroundColor="white" color='black' borderRadius="40" onClick={handleConnect}>
                {connected ? <Icon as={RxAvatar} w={6} h={6} /> : <Text>Connect</Text>}
              </Button>
            </Stack>
            
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
