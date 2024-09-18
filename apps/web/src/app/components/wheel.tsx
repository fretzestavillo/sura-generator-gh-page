import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import type { WheelDataType } from 'react-custom-roulette';

export interface SpinWheelProps {
  options: WheelDataType[];
  onSpinClick?: () => void;
  onStopSpinning: (prizeNumber: number) => void;
  mustStartSpinning: boolean;
  prizeNumber?: number;
  spinDuration: number;
  backgroundColors?: string[];
  textColors?: string[];
  outerBorderColor?: string;
  outerBorderWidth?: number;
  innerBorderColor?: string;
  innerBorderWidth?: number;
  innerRadius?: number;
  radiusLineColor?: string;
  radiusLineWidth?: number;
  fontFamily?: string;
  fontSize?: number;
  textDistance?: number;
}

const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50'];
const textColors = ['#0b3351'];
const outerBorderColor = '#eeeeee';
const outerBorderWidth = 3;
const innerBorderColor = '#30261a';
const innerBorderWidth = 0;
const innerRadius = 1;
const radiusLineColor = '#eeeeee';
const radiusLineWidth = 2;
const fontFamily = 'Roboto';
const fontSize = 15;
const textDistance = 55;
const spinDuration = 1.0;
const defaultPrizeNumber = 0;

const generateRandomPrizeNumber = (options: WheelDataType[]) => {
  return Math.floor(Math.random() * Number(options.length));
};

export function SpinWheel(props: SpinWheelProps) {
  const [prizeNumber, setPrizeNumber] = useState(defaultPrizeNumber);
  useEffect(() => {
    if (!props.prizeNumber) {
      const randomPrizeNumber = generateRandomPrizeNumber(props.options);
      setPrizeNumber(randomPrizeNumber);

      return;
    }

    setPrizeNumber(props.prizeNumber);
  }, [props.prizeNumber, props.options]);
  return (
    <Wheel
      mustStartSpinning={props.mustStartSpinning}
      prizeNumber={prizeNumber}
      data={props.options}
      backgroundColors={backgroundColors}
      textColors={textColors}
      fontFamily={fontFamily}
      fontSize={fontSize}
      outerBorderColor={outerBorderColor}
      outerBorderWidth={outerBorderWidth}
      innerRadius={innerRadius}
      innerBorderColor={innerBorderColor}
      innerBorderWidth={innerBorderWidth}
      radiusLineColor={radiusLineColor}
      radiusLineWidth={radiusLineWidth}
      spinDuration={spinDuration}
      startingOptionIndex={2}
      textDistance={textDistance}
      onStopSpinning={() => props.onStopSpinning(prizeNumber)}
    />
  );
}
