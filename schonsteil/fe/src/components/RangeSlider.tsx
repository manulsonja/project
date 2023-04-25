import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function RangeSlider() {
    const [value, setValue] = React.useState<number[]>([20, 37]);
  
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
    };
    function valuetext(value: number) {
        return `${value}°C`;
      }
          return (
      <Box  sx={{ flexGrow: 1 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    );
  }
  