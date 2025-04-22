// Fatores de conversão baseados na imagem fornecida
export const conversionFactors = {
  force: {
    'Kgf': { toBase: 9.80665, precision: 0 },
    'N': { toBase: 1, precision: 0 },
    'kN': { toBase: 1000, precision: 1 },
  },
  moment: {
    'Tf.m': { toBase: 9806.65, precision: 0 },
    'Kgf.mm': { toBase: 0.00980665, precision: 0 },
    'Kgf.cm': { toBase: 0.0980665, precision: 0 },
    'Kgf.m': { toBase: 9.80665, precision: 0 },
    'Tf.mm': { toBase: 9.80665, precision: 1 },
    'Tf.cm': { toBase: 98.0665, precision: 0 },
    'N.mm': { toBase: 0.001, precision: 0 },
    'N.cm': { toBase: 0.01, precision: 0 },
    'N.m': { toBase: 1, precision: 0 },
    'kN.mm': { toBase: 1, precision: 1 },
    'kN.cm': { toBase: 10, precision: 0 },
    'kN.m': { toBase: 1000, precision: 0 },
  },
  stress: {
    'MPa': { toBase: 1000000, precision: 0 },
    'Kgf/mm²': { toBase: 9806650, precision: 0 },
    'Kgf/cm²': { toBase: 98066.5, precision: 0 },
    'Kgf/m²': { toBase: 9.80665, precision: 0 },
    'Tf/mm²': { toBase: 9806650, precision: 3 },
    'Tf/cm²': { toBase: 98066.5, precision: 1 },
    'Tf/m²': { toBase: 9.80665, precision: 0 },
    'N/mm²': { toBase: 1000000, precision: 0 },
    'N/cm²': { toBase: 10000, precision: 0 },
    'N/m²': { toBase: 1, precision: 0 },
    'kN/mm²': { toBase: 1000000000, precision: 3 },
    'kN/cm²': { toBase: 10000000, precision: 0 },
    'kN/m²': { toBase: 1000, precision: 0 },
    'kPa': { toBase: 1000, precision: 0 },
    'Pa': { toBase: 1, precision: 0 },
  }
};