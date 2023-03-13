import { Box, Image, Link, Spinner, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PlayingAnimation from "../spotify/PlayingAnimation";
import getNowPlayingItem from "../spotify/SpotifyApi";
import SpotifyLogo from "../spotify/SpotifyLogo";

const SpotifyNowPlaying = (props) => {
  // state variables to keep track of loading status and result data
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // call the getNowPlayingItem function and pass in props
    Promise.all([
      getNowPlayingItem(
        props.client_id,
        props.client_secret,
        props.refresh_token
      ),
    ]).then((results) => {
      setResult(results[0]);
      setLoading(false);
    });
  });

  // render the component with conditional logic based on loading status and API result data
  return (
    <Center>
      <Box width="xs">
        {loading ? (
          <Stack align="center" mb={8}>
            <Spinner size="md" speed="0.6s" thickness={3} color="gray.500" />
          </Stack>
        ) : (
          <Stack width="full" mb={result.isPlaying ? 2 : 4} spacing={3}>
            <Stack spacing={2} direction="row" align="center">
              <SpotifyLogo />
              <Text fontWeight="semibold">
                {result.isPlaying ? "Now playing" : "Currently offline"}
              </Text>
              {result.isPlaying && <PlayingAnimation />}
            </Stack>
            {result.isPlaying && (
              <Box p={2} borderRadius="lg" borderWidth={1}>
                <Stack direction="row" spacing={4} align="center">
                  <Image
                    alt={`${result.title} album art`}
                    src={result.albumImageUrl}
                    width={12}
                    height={12}
                    borderRadius="sm"
                  />
                  <Stack spacing={0} overflow="hidden">
                    <Link href={result.songUrl} target="_blank">
                      <Text
                        fontWeight="semibold"
                        width="full"
                        isTruncated
                        color="alph"
                      >
                        {result.title}
                      </Text>
                    </Link>
                    <Text color="gray.500" isTruncated>
                      {result.artist}
                    </Text>
                    <Text></Text>
                  </Stack>
                </Stack>
              </Box>
            )}
          </Stack>
        )}
      </Box>
    </Center>
  );
};

export default SpotifyNowPlaying;

const Center = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
