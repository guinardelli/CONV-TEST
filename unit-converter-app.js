// Estrutura completa da aplicação
// Vamos organizar como um projeto React + Electron

// Arquivo: package.json
/*
{
  "name": "conversor-unidades",
  "version": "1.0.0",
  "description": "Conversor de unidades de engenharia",
  "main": "public/electron.js",
  "homepage": "./",
  "author": "Seu Nome",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron:dev": "concurrently \"BROWSER=none npm start\" \"wait-on http://localhost:3000 && electron .\"",
    "electron:build": "npm run build && electron-builder",
    "release": "npm run build && electron-builder --publish=always"
  },
  "build": {
    "appId": "com.conversor.unidades",
    "productName": "Conversor de Unidades",
    "files": [
      "build/**/*",
      "node_modules/**/*"
    ],
    "directories": {
      "buildResources": "assets"
    }
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "mathjs": "^11.8.0"
  },
  "devDependencies": {
    "concurrently": "^8.2.0",
    "electron": "^25.3.0",
    "electron-builder": "^24.4.0",
    "tailwindcss": "^3.3.2",
    "wait-on": "^7.0.1"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
*/

// Arquivo: public/electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'icon.png')
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Arquivo: src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Arquivo: src/index.css
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f0f0;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
*/

// Arquivo: src/App.js
import React from 'react';
import { UnitConverter } from './components/UnitConverter';
import './App.css';

function App() {
  return (
    <div className="App bg-gray-200 min-h-screen flex flex-col p-4">
      <div className="bg-gray-100 max-w-4xl mx-auto rounded border border-gray-400 shadow-md overflow-hidden">
        <div className="bg-gray-300 p-1 border-b border-gray-400 flex justify-between items-center">
          <div className="text-sm font-bold">Unidades 2 (Alberto Smaniotto)</div>
          <div className="flex space-x-2">
            <button className="w-6 h-6 flex items-center justify-center text-xs border border-gray-400 bg-gray-100">−</button>
            <button className="w-6 h-6 flex items-center justify-center text-xs border border-gray-400 bg-gray-100">□</button>
            <button className="w-6 h-6 flex items-center justify-center text-xs border border-gray-400 bg-gray-100">×</button>
          </div>
        </div>
        <main className="p-4">
          <UnitConverter />
        </main>
      </div>
    </div>
  );
}

export default App;

// Arquivo: src/App.css
/*
.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
*/

// Arquivo: src/components/UnitConverter.js
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

// Arquivo: src/components/UnitCategory.js
import React from 'react';

export function UnitCategory({ category, units, value, onValueChange }) {
  const handleInputChange = (e, unit) => {
    const newValue = e.target.value;
    onValueChange(newValue, unit);
  };

  return (
    <div className="w-1/3">
      <div className="overflow-y-auto h-96 border border-gray-300">
        <table className="w-full border-collapse">
          <tbody>
            {Object.keys(units).map((unit) => (
              <tr key={unit} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-1">
                  <input
                    type="text"
                    value={value && value[unit] ? value[unit].toFixed(units[unit].precision || 6) : ''}
                    onChange={(e) => handleInputChange(e, unit)}
                    className="w-full p-1 border border-gray-300 text-right"
                  />
                </td>
                <td className="p-1 text-sm text-gray-700 whitespace-nowrap">
                  {unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Arquivo: src/utils/conversionFactors.js
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

// Arquivo: tailwind.config.js
/*
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
*/

// Arquivo: public/index.html
/*
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Conversor de Unidades de Engenharia"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Conversor de Unidades</title>
  </head>
  <body>
    <noscript>Você precisa habilitar o JavaScript para executar este app.</noscript>
    <div id="root"></div>
  </body>
</html>
*/
