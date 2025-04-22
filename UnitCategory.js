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