import React, { useState, useEffect } from 'react';
import { UnitCategory } from './UnitCategory';
import { conversionFactors } from '../utils/conversionFactors';

export function UnitConverter() {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [resultValue, setResultValue] = useState('=');
  
  // Efeito para atualizar o valor quando o usuário altera a entrada
  useEffect(() => {
    if (inputValue && inputUnit) {
      convertValue();
    }
  }, [inputValue, inputUnit]);

  // Função para converter o valor de entrada para todos os valores equivalentes
  const convertValue = () => {
    if (!inputValue || !inputUnit) return;
    
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;
    
    // Encontrar a categoria da unidade
    let category;
    let categoryName;
    
    for (const [catName, units] of Object.entries(conversionFactors)) {
      if (Object.keys(units).includes(inputUnit)) {
        category = units;
        categoryName = catName;
        break;
      }
    }
    
    if (!category) return;
    
    // Converter para a unidade base da categoria
    const baseValue = value * category[inputUnit].toBase;
    
    // Atualizar todos os valores nas outras unidades
    const results = {};
    Object.keys(category).forEach(unit => {
      results[unit] = baseValue / category[unit].toBase;
    });
    
    setOutputValue({ [categoryName]: results });
    
    // Exibir o valor no display de resultado
    setResultValue(value.toString());
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl border border-gray-300">
      <div className="text-center mb-2 text-xl font-semibold">Unidades</div>
      
      <div className="flex flex-row gap-2 mb-4">
        <div className="w-1/3 text-center font-bold">Força</div>
        <div className="w-1/3 text-center font-bold">Momento</div>
        <div className="w-1/3 text-center font-bold">Tensão</div>
      </div>
      
      <div className="flex flex-row gap-2">
        <UnitCategory 
          category="force"
          units={conversionFactors.force}
          value={outputValue && outputValue.force}
          onValueChange={(val, unit) => {
            setInputValue(val);
            setInputUnit(unit);
          }}
        />
        
        <UnitCategory 
          category="moment"
          units={conversionFactors.moment}
          value={outputValue && outputValue.moment}
          onValueChange={(val, unit) => {
            setInputValue(val);
            setInputUnit(unit);
          }}
        />
        
        <UnitCategory 
          category="stress"
          units={conversionFactors.stress}
          value={outputValue && outputValue.stress}
          onValueChange={(val, unit) => {
            setInputValue(val);
            setInputUnit(unit);
          }}
        />
      </div>
      
      <div className="mt-6 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="border border-gray-300 p-4 w-32 text-center mb-4 bg-gray-50">
            <span className="text-2xl font-bold">{resultValue}</span>
          </div>
          <button 
            onClick={() => window.close()}
            className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 border border-gray-400"
          >
            Sai
          </button>
        </div>
      </div>
    </div>
  );
}