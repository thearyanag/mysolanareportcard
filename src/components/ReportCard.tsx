import { Box, Badge, Image, HStack, VStack } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

export const ReportCard = () => {
  const [degenScore, setDegenScore] = useState(0);
  const [activity, setActivity] = useState(0);
  const [nfts, setNfts] = useState(0);
  const [governance, setGovernance] = useState(0);
  const [variety, setVariety] = useState(0);
  const [staking, setStaking] = useState(0);
  const [longevity, setLongevity] = useState(0);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("https://i.imgur.com/bmFcMj1.png");

  const [minted, setMinted] = useState(false);

  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) console.log(publicKey.toString());
  }, [connected]);

  let nftStats = async () => {
    setLoading(true);
    let res = await axios.get("/api/nft-stats", {
      params: {
        wallet: publicKey.toString(),
      },
    });
    console.log(res.data);
    setNfts(res.data.nfts);
  };

  let novice = "https://i.imgur.com/bmFcMj1.png";
  let intermediate = "https://i.imgur.com/s2qKwWx.png";
  let expert = "https://i.imgur.com/oWx6DKY.png";

  let interval = setInterval(() => {
    let random = Math.floor(Math.random() * 3) + 1;

    if (random === 1) {
      setImage(novice);
    } else if (random === 2) {
      setImage(intermediate);
    } else {
      setImage(expert);
    }
  }, 1000);

  useEffect(() => {
    if (minted) {
      clearInterval(interval);
    }
  }, [minted]);

  return (
    <HStack spacing={8}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg">
        <Image
          src={image}
          alt={"Report Card"}
          borderRadius={10}
          borderColor="white"
          borderWidth="2px"
        />
      </Box>

      <Box maxW="sm" borderRadius="lg" width="100vh">
        <VStack spacing={4}>
          <HStack>
            <Box>
              <InputGroup>
                <InputLeftAddon children="Degen Score" fontSize={"2xl"} />
                <Input
                  readOnly
                  placeholder="Degen Score"
                  value={degenScore}
                  fontSize={"2xl"}
                />
              </InputGroup>
            </Box>
          </HStack>
          <HStack>
            <Box>
              <InputGroup>
                <InputLeftAddon children="Activity" />
                <Input readOnly placeholder="Activity" value={activity} />
              </InputGroup>
            </Box>
            <Box>
              <InputGroup>
                <InputLeftAddon children="NFTs" />
                <Input readOnly placeholder="Activity" value={nfts} />
              </InputGroup>
            </Box>
          </HStack>
          <HStack>
            <Box>
              <InputGroup>
                <InputLeftAddon children="Governance" />
                <Input readOnly placeholder="Activity" value={governance} />
              </InputGroup>
            </Box>
            <Box>
              <InputGroup>
                <InputLeftAddon children="Variety" />
                <Input readOnly placeholder="Activity" value={variety} />
              </InputGroup>
            </Box>
          </HStack>

          <HStack>
            <Box>
              <InputGroup>
                <InputLeftAddon children="Staking" />
                <Input readOnly placeholder="Activity" value={staking} />
              </InputGroup>
            </Box>
            <Box>
              <InputGroup>
                <InputLeftAddon children="Longevity" />
                <Input readOnly placeholder="Activity" value={longevity} />
              </InputGroup>
            </Box>
          </HStack>
          <HStack>
            <Box>
              <Button isLoading={loading} colorScheme="blue" color={"#000"}>
                Mint my Report Card
              </Button>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </HStack>
  );
};
