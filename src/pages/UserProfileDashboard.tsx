import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

export const UserProfileDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const { financialData } = user;
  const annualIncome = financialData.monthlyIncome * 12;
  const annualExpenses = financialData.monthlyExpenses * 12;
  const annualSurplus = annualIncome - annualExpenses;
  const savingsRate = ((annualSurplus / annualIncome) * 100).toFixed(1);
  const fireNumber = annualExpenses * 25;
  const yearsToFire = financialData.currentSavings > 0 
    ? Math.log(fireNumber / financialData.currentSavings) / Math.log(1 + (annualSurplus / fireNumber))
    : 0;
  const estimatedRetirementAge = financialData.age + Math.max(yearsToFire, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation showFullNav={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Financial Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}! Here's your FIRE journey overview.</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Annual Income</p>
            <p className="text-3xl font-bold text-emerald-700">₹{(annualIncome / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-500 mt-2">₹{financialData.monthlyIncome.toLocaleString()}/month</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Annual Expenses</p>
            <p className="text-3xl font-bold text-blue-700">₹{(annualExpenses / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-500 mt-2">₹{financialData.monthlyExpenses.toLocaleString()}/month</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Annual Savings</p>
            <p className="text-3xl font-bold text-amber-700">₹{(annualSurplus / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-500 mt-2">Savings Rate: {savingsRate}%</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Current Savings</p>
            <p className="text-3xl font-bold text-purple-700">₹{(financialData.currentSavings / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-500 mt-2">Total Assets</p>
          </div>
        </div>

        {/* FIRE Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* FIRE Progress */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FIRE Goal Progress</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700 font-medium">FIRE Number (25x Annual Expenses)</p>
                  <p className="text-lg font-bold text-emerald-700">₹{(fireNumber / 100000).toFixed(0)}L</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                    style={{width: `${Math.min((financialData.currentSavings / fireNumber) * 100, 100)}%`}}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>₹{(financialData.currentSavings / 100000).toFixed(1)}L Saved</span>
                  <span>{Math.min(parseFloat((financialData.currentSavings / fireNumber) * 100).toFixed(1) as any, 100)}% Complete</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Estimated FIRE Age:</strong> <span className="text-blue-700 font-bold text-lg">{Math.round(estimatedRetirementAge)}</span>
                </p>
                <p className="text-xs text-gray-600">
                  Based on current savings and {savingsRate}% savings rate
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium">Current Age</p>
                  <p className="text-2xl font-bold text-gray-900">{financialData.age}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium">Target Retirement</p>
                  <p className="text-2xl font-bold text-gray-900">{financialData.targetRetirementAge}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Snapshot */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Snapshot</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-700 font-medium">Monthly Surplus</span>
                <span className="text-xl font-bold text-emerald-700">₹{(financialData.monthlyIncome - financialData.monthlyExpenses).toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-700 font-medium">Savings Rate</span>
                <span className="text-xl font-bold text-amber-700">{savingsRate}%</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-700 font-medium">Years of Expenses Saved</span>
                <span className="text-xl font-bold text-purple-700">{(financialData.currentSavings / annualExpenses).toFixed(1)} yrs</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-700 font-medium">Income Multiple</span>
                <span className="text-xl font-bold text-blue-700">{(fireNumber / annualIncome).toFixed(1)}x</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/expenses')}
              className="w-full mt-6 bg-emerald-700 text-white py-3 rounded-lg font-bold hover:bg-emerald-800 transition">
              Start FIRE Planning
            </button>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => navigate('/expenses')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-left">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Calculate FIRE Numbers</h3>
            <p className="text-gray-600 text-sm">Adjust expenses and explore different FIRE scenarios</p>
          </button>

          <button 
            onClick={() => navigate('/risk')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-left">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Choose Risk Profile</h3>
            <p className="text-gray-600 text-sm">Select your investment strategy and see recommendations</p>
          </button>

          <button 
            onClick={() => navigate('/simulation')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-left">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Run Simulations</h3>
            <p className="text-gray-600 text-sm">Project your wealth and track progress to your FIRE goal</p>
          </button>
        </div>
      </main>
    </div>
  );
};
