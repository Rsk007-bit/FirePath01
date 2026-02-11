import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

export const ExpensesPage = () => {
  const navigate = useNavigate();
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [currentAge, setCurrentAge] = useState(20);
  const [retirementAge, setRetirementAge] = useState(40);
  const [inflationRate, setInflationRate] = useState(10);
  const [coastFireAge, setCoastFireAge] = useState(22);

  const expenseToday = monthlyExpense * 12;
  const expenseAt40 = expenseToday * Math.pow(1 + inflationRate / 100, retirementAge - currentAge);
  const leanFire = expenseToday * 20;
  const fire = expenseToday * 25;
  const fatFire = expenseToday * 75;
  const coastFire = expenseToday * 30;

  const handleNext = () => {
    navigate('/risk', { 
      state: { 
        monthlyExpense, 
        currentAge, 
        retirementAge, 
        inflationRate, 
        coastFireAge,
        expenseToday,
        fire
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation showFullNav={true} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="p-6 md:p-8 bg-emerald-50 border-b border-emerald-100">
            <h2 className="text-3xl font-bold text-emerald-900 flex items-center gap-2">
              💰 Input Your Expenses
            </h2>
            <p className="text-emerald-700 mt-2">
              Let's calculate your FIRE number based on your lifestyle and inflation expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Input Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expense (₹)</label>
                <input 
                  type="number" 
                  value={monthlyExpense}
                  onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Age</label>
                <input 
                  type="number" 
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desired Retirement Age</label>
                <input 
                  type="number" 
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assumed Inflation Rate (%)</label>
                <input 
                  type="number" 
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desired Coast FIRE Age</label>
                <input 
                  type="number" 
                  value={coastFireAge}
                  onChange={(e) => setCoastFireAge(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>
            </div>

            {/* Output Results */}
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-semibold uppercase tracking-wide">Expense Today</p>
                <p className="text-3xl font-bold text-blue-600">₹{expenseToday.toLocaleString()}</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <p className="text-sm text-orange-800 font-semibold uppercase tracking-wide">Expense at {retirementAge}</p>
                <p className="text-3xl font-bold text-orange-600">₹{Math.round(expenseAt40).toLocaleString()}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <p className="text-sm text-purple-800 font-semibold uppercase tracking-wide">Lean FIRE</p>
                <p className="text-3xl font-bold text-purple-600">₹{Math.round(leanFire).toLocaleString()}</p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <p className="text-sm text-emerald-800 font-semibold uppercase tracking-wide">FIRE (4% Rule)</p>
                <p className="text-3xl font-bold text-emerald-600">₹{Math.round(fire).toLocaleString()}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <p className="text-sm text-red-800 font-semibold uppercase tracking-wide">FAT FIRE</p>
                <p className="text-3xl font-bold text-red-600">₹{Math.round(fatFire).toLocaleString()}</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p className="text-sm text-indigo-800 font-semibold uppercase tracking-wide">Coast FIRE</p>
                <p className="text-3xl font-bold text-indigo-600">₹{Math.round(coastFire).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between p-8 border-t border-gray-200">
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
              Back
            </button>
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 transition shadow-lg">
              Next: Risk Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
