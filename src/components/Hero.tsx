import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    // alignItems="top"
    // height="100vh"
    margin={10}
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Heading fontSize="4vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'My Solana Report Card',
}
