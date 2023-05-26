import { Box, Badge, Image, HStack, VStack } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

export const ReportCard = () => {
  const [degenScore, setDegenScore] = useState(0);
  const [activity, setActivity] = useState(0);
  const [nfts, setNfts] = useState(0);
  const [variety, setVariety] = useState(0);
  const [staking, setStaking] = useState(0);
  const [longevity, setLongevity] = useState(0);
  const [explorer, setExplorer] = useState(0);
  const [error, setError] = useState(false);
  const [degenData, setDegenData] = useState({});

  
  let novice = "https://i.imgur.com/bmFcMj1.png";
  let intermediate = "https://i.imgur.com/s2qKwWx.png";
  let expert = "https://i.imgur.com/oWx6DKY.png";

  const BACKEND_URL = "https://rcbe-production.up.railway.app"

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("https://i.imgur.com/bmFcMj1.png");

  const [minted, setMinted] = useState(false);

  const { connected, publicKey } = useWallet();

  const [mintAddress, setMintAddress] = useState("");


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
    if (publicKey) {
      setLoading(true);
      let res = axios
        .get(`${BACKEND_URL}/getData`, {
          params: {
            wallet: publicKey.toString(),
          },
        })
        .then((res) => {
          setLoading(false);
          setDegenData(res.data);

          setDegenScore(res.data.totalScore);
          setNfts(res.data.nftTotal);
          setActivity(res.data.totalInteractions);
          setVariety(res.data.uniqueProgramInteractions);
          setStaking(res.data.stakedSol);
          setLongevity(res.data.walletage);
          setExplorer(res.data.uniqueTransactionTypes);

          clearInterval(interval);

          if (degenScore <= 5) setImage(novice);
          else if (degenScore <= 9) setImage(intermediate);
          else setImage(expert);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    }
  }, [connected]);

  let mint = async () => {
    setLoading(true);
    await axios.post(`${BACKEND_URL}/mint`, {
      params: {
        wallet: publicKey.toString(),
      },
      data: degenData,
    });
    setLoading(false);
    setMinted(true);
  };

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
                <InputLeftAddon children="Variety" />
                <Input readOnly placeholder="Activity" value={variety} />
              </InputGroup>
            </Box>
            <Box>
              <InputGroup>
                <InputLeftAddon children="Staking" />
                <Input readOnly placeholder="Activity" value={staking} />
              </InputGroup>
            </Box>
          </HStack>

          <HStack>
            <Box>
              <InputGroup>
                <InputLeftAddon children="Longevity" />
                <Input readOnly placeholder="Activity" value={longevity} />
              </InputGroup>
            </Box>
            <Box>
              <InputGroup>
                <InputLeftAddon children="Explorer" />
                <Input readOnly placeholder="Activity" value={explorer} />
              </InputGroup>
            </Box>
          </HStack>
          <HStack>
            <Box>
              {!connected && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Wallet not connected!</AlertTitle>
                  <AlertDescription>
                    Please connect your wallet to mint your report card.
                  </AlertDescription>
                </Alert>
              )}
              {connected && !minted && (
                <Button
                  isLoading={loading}
                  colorScheme="blue"
                  color={"#000"}
                  onClick={mint}
                >
                  Mint my Report Card
                </Button>
              )}

              {connected && minted && (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>Report Card Minted!</AlertTitle>
                  <AlertDescription>
                    Your report card has been minted!
                    <Link href={`https://xray.helius.xyz/account/${publicKey.toString()}`}>
                      See it here.
                    </Link>
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>There was an error!</AlertTitle>
                  <AlertDescription>
                    Please refresh the browser.
                  </AlertDescription>
                </Alert>
              )}
            </Box>
          </HStack>
        </VStack>
      </Box>
    </HStack>
  );
};
