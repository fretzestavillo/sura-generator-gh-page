import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Skeleton,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material';
import type { WheelDataType } from 'react-custom-roulette';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Howl, Howler } from 'howler';

import { SpinWheel } from './components';
import { generateRandomColor } from './utils';
import spinWheelSound from '../assets/audio/spin-wheel-sound.mp3';

const API_URL =
  'https://script.google.com/macros/s/AKfycbye-vQ7rkXjBPc5I8yhQo9HQcwBnBDtIC9Wch6mortUj78RwINFQbdY2dJkQAiH9aoIkA/exec';

type Sura = {
  id: number;
  name: string;
};

function RandomText(props: { options: string[]; interval: number }) {
  const [newName, setNewName] = useState('');

  const selectRandomText = useCallback(() => {
    const index = Math.floor(Math.random() * props.options.length);
    setNewName(props.options[index]);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(selectRandomText, props.interval / 100);
    return () => clearInterval(intervalId);
  }, [selectRandomText, props.interval]);

  return (
    <Box
      sx={{
        height: 100,
      }}
    >
      <Typography variant="h4">{newName}</Typography>
    </Box>
  );
}

export default function App() {
  const { width, height } = useWindowSize();
  const [suraList, setSuraList] = useState<WheelDataType[]>();
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [selectedSura, setSelectedSura] = useState<number | null>(null);
  const theme = useTheme();
  const sound = new Howl({
    src: [spinWheelSound],
    sprite: {
      start: [0, 750, true],
      mid: [150, 450, true],
      end: [800, 1000, false],
      full: [0, 1000, true],
    },
    html5: false,
  });
  // sound.duration(11000);
  function handleSpinClick() {
    setMustStartSpinning(true);
    setTimeout(() => {
      sound.play('start');
      sound.rate(0.6);
      sound.volume(0.5);
    }, 1100);
    setTimeout(() => {
      sound.rate(0.75);
      sound.volume(0.8);
    }, 1300);
    setTimeout(() => {
      sound.rate(0.85);
      sound.volume(1.1);
    }, 1500);
    setTimeout(() => {
      sound.rate(0.95);
      sound.volume(1.4);
    }, 1700);
    setTimeout(() => {
      sound.rate(1);
      sound.volume(1.5);
    }, 1800);
    setTimeout(() => {
      sound.rate(1.2);
      sound.volume(1.6);
    }, 1900);
    setTimeout(() => {
      sound.rate(1.4);
      sound.volume(1.8);
    }, 2500);
    setTimeout(() => {
      sound.rate(1.6);
      sound.volume(2);
    }, 3000);
    setTimeout(() => {
      sound.rate(1.8);
      sound.volume(1.9);
    }, 4000);
    setTimeout(() => {
      sound.rate(1.6);
      sound.volume(1.8);
    }, 5000);
    setTimeout(() => {
      sound.rate(1.4);
      sound.volume(2);
    }, 6000);
    setTimeout(() => {
      sound.rate(1.2);
      sound.volume(1.8);
    }, 7000);
    setTimeout(() => {
      sound.rate(1);
      sound.volume(1.6);
    }, 8000);
    setTimeout(() => {
      sound.rate(0.95);
      sound.volume(1.4);
    }, 8500);
    setTimeout(() => {
      sound.rate(0.85);
      sound.volume(1.2);
    }, 9000);
    setTimeout(() => {
      sound.rate(0.75);
      sound.volume(1);
    }, 9500);
    setTimeout(() => {
      sound.rate(0.7);
      sound.volume(0.8);
    }, 10000);
    setTimeout(() => {
      sound.rate(0.65);
      sound.volume(0.6);
    }, 10500);
    setTimeout(() => {
      sound.rate(0.5);
      sound.volume(0.4);
      sound.stop();
      sound.play('end');
      sound.stop();
    }, 11000);
  }

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => {
        const { data }: { data: Sura[] } = res;
        console.log({ data });
        const suraList: WheelDataType[] = data.map((sura) => {
          const backgroundColor = generateRandomColor();
          const textColor = theme.palette.getContrastText(backgroundColor);
          return {
            option: sura.name,
            style: {
              textColor,
              backgroundColor,
            },
          };
        });
        setSuraList(suraList);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ReactConfetti
        recycle={true}
        run={Boolean(!mustStartSpinning && selectedSura)}
        width={width}
        height={height}
        numberOfPieces={1000}
        hidden={mustStartSpinning}
      />
      <Container
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '500px',
            md: '600px',
            lg: '600px',
            xl: '600px',
          },
        }}
      >
        <Card
          style={{
            marginTop: '13vh',
          }}
          variant="outlined"
        >
          {suraList && suraList.length > 0 ? (
            <Stack gap={2} padding={2} alignItems={'center'}>
              <h2>Generate a sura</h2>
              <Stack gap={2} padding={2} alignItems={'center'}>
                <SpinWheel
                  options={suraList}
                  mustStartSpinning={mustStartSpinning}
                  spinDuration={0.5}
                  prizeNumber={Math.floor(
                    Math.random() * Number(suraList.length)
                  )}
                  onStopSpinning={(number) => {
                    setSelectedSura(number);
                    setMustStartSpinning(false);
                    sound.stop();
                    sound.loop(false);
                  }}
                />
                {mustStartSpinning ? (
                  <RandomText
                    interval={10_000}
                    options={suraList.map((e) => String(e.option))}
                  />
                ) : (
                  selectedSura && (
                    <Box
                      sx={{
                        height: 100,
                      }}
                    >
                      <Typography variant="h4">
                        {suraList[selectedSura].option}
                      </Typography>
                    </Box>
                  )
                )}
              </Stack>
              <Button
                disabled={!suraList || suraList.length < 1}
                fullWidth
                variant="contained"
                onClick={handleSpinClick}
              >
                Spin the wheel
              </Button>
            </Stack>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                gap: 4,
                flexDirection: 'column',
              }}
            >
              <Skeleton
                variant="text"
                width={300}
                sx={{
                  fontSize: 42,
                }}
              />
              <Skeleton variant="circular" width={300} height={300} />
              <Skeleton variant="rectangular" width={'100%'} height={40} />
            </Box>
          )}
        </Card>
      </Container>
    </ThemeProvider>
  );
}
