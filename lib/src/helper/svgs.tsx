import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export function SvgRightTick(props:any) {
  return (
    <Svg
      width={18}
      height={13}
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.582.42a1.424 1.424 0 00-2.02 0L6.477 9.54 2.438 5.487a1.424 1.424 0 00-2.02 0 1.437 1.437 0 000 2.026l5.048 5.067a1.42 1.42 0 002.02 0L17.582 2.446a1.437 1.437 0 000-2.026z"
        fill="#E6E7E9"
      />
    </Svg>

  );
}

export function SvgOpenIssues(props:any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={9} cy={9} r={8.5} stroke="#E6E7E9" />
      <Circle cx={9} cy={9} r={2} fill="#E6E7E9" />
    </Svg>
  )
}

export function SvgOpenIssues2(props:any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={9} cy={9} r={8.5} stroke="#0DD9A8" />
      <Circle cx={9} cy={9} r={2} fill="#0DD9A8" />
    </Svg>
  )
}

export function SvgComment(props:any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.5}
        d="M16.667 1.667H3.333c-.916 0-1.666.75-1.666 1.666v15L5 15h11.667c.916 0 1.666-.75 1.666-1.667v-10c0-.916-.75-1.666-1.666-1.666zm0 11.666H5L3.333 15V3.333h13.334v10z"
        fill="#E6E7E9"
      />
    </Svg>
  )
}