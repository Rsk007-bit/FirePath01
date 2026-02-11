import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SimulationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const [currentSavings, setCurrentSavings] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(50000);
  const [chartData, setChartData] = useState<Array<{year: number; balance: number; fireGoal: number}>>([]);

  const fire = state.fire || 10000000;
  const expectedReturn = state.expectedReturn || 7;
  const retirementAge = state.retirementAge || 40;
  const currentAge = state.currentAge || 20;
  const riskProfile = state.riskProfile || 'medium';

  useEffect(() => {
    const data: Array<{year: number; balance: number; fireGoal: number}> = [];
    let balance = currentSavings;
    const yearsToSimulate = Math.max(retirementAge - currentAge + 10, 30);

    for (let year = 0; year <= yearsToSimulate; year++) {
      data.push({
        year: currentAge + year,
        balance: Math.round(balance),
        fireGoal: fire
      });
      balance = (balance + (monthlySavings * 12)) * (1 + (expectedReturn / 100));
    }
    setChartData(data);
  }, [currentSavings, monthlySavings, fire, expectedReturn, retirementAge, currentAge]);

  const yearsUntilFire = chartData.findIndex(d => d.balance >= fire);
  const estimatedFireAge = yearsUntilFire >= 0 ? currentAge + yearsUntilFire : null;

  const handleNext = () => {
    navigate('/');
  };

  const riskIcons = {
    safe: '🛡️',
    medium: '⚖️',
    risky: '🚀'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation showFullNav={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="p-6 md:p-8 bg-emerald-50 border-b border-emerald-100">
            <h2 className="text-3xl font-bold text-emerald-900 flex items-center gap-2">
              🎯 FIRE Simulation
            </h2>
            <p className="text-emerald-700 mt-2">
              Your personalized path to Financial Independence. {riskIcons[riskProfile as keyof typeof riskIcons]} {riskProfile.charAt(0).toUpperCase() + riskProfile.slice(1)} Risk Profile
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Input Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Savings (₹)</label>
                <input 
                  type="number" 
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Savings (₹)</label>
                <input 
                  type="number" 
                  value={monthlySavings}
                  onChange={(e) => setMonthlySavings(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>

              {/* Summary Cards */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                <p className="text-sm text-amber-800 font-semibold uppercase tracking-wide">Your FIRE Goal</p>
                <p className="text-2xl font-bold text-amber-600">₹{fire.toLocaleString()}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-semibold uppercase tracking-wide">Expected Return</p>
                <p className="text-2xl font-bold text-blue-600">{expectedReturn}% per year</p>
              </div>

              {estimatedFireAge && (
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <p className="text-sm text-emerald-800 font-semibold uppercase tracking-wide">Est. FIRE Age</p>
                  <p className="text-2xl font-bold text-emerald-600">{estimatedFireAge}</p>
                </div>
              )}

              {estimatedFireAge && (
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <p className="text-sm text-green-800 font-semibold uppercase tracking-wide">Years Until FIRE</p>
                  <p className="text-2xl font-bold text-green-600">{yearsUntilFire} years</p>
                </div>
              )}
            </div>

            {/* Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-100 rounded-xl p-4 h-full">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Age', position: 'insideBottomRight', offset: -5 }}
                      />
                      <YAxis tickFormatter={(value) => `₹${value/10000000}Cr`} />
                      <Tooltip 
                        formatter={(value) => `₹${(value as number).toLocaleString()}`}
                        labelFormatter={(label) => `Age ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="balance" 
                        stroke="#059669" 
                        strokeWidth={3} 
                        dot={false} 
                        name="Portfolio Balance"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="fireGoal" 
                        stroke="#d97706" 
                        strokeDasharray="5 5" 
                        strokeWidth={2} 
                        dot={false} 
                        name="FIRE Goal"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-500">
                    Loading chart...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Simulation Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Starting Age</p>
                <p className="text-2xl font-bold text-gray-900">{currentAge}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Target Retirement Age</p>
                <p className="text-2xl font-bold text-gray-900">{retirementAge}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Savings</p>
                <p className="text-2xl font-bold text-gray-900">₹{currentSavings.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Contribution</p>
                <p className="text-2xl font-bold text-gray-900">₹{monthlySavings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between p-8 border-t border-gray-200">
            <button 
              onClick={() => navigate('/risk', { state })}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
              Back
            </button>
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 transition shadow-lg">
              Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
