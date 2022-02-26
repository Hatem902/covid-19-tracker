import React from 'react';

export const CasesTypeColors = () => {
  const casesTypeColors = {
    cases: {
      hex: '#CC1034',
      rgb: 'rgb(204, 16, 52)',
      half_op: 'rgba(204, 16, 52, 0.5)',

      multiplier: 180,
    },
    recovered: {
      hex: '#7dd71d',
      rgb: 'rgb(125, 215, 29)',
      half_op: 'rgba(125, 215, 29, 0.5)',

      multiplier: 180,
    },
    deaths: {
      hex: '#fb4443',
      rgb: 'rgb(251, 68, 67)',
      half_op: 'rgba(251, 68, 67, 0.5)',

      multiplier: 780,
    },
  };
  return casesTypeColors;
};
