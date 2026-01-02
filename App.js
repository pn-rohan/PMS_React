import React, { useState } from 'react';
import './App.css';
import data from './data.json';
import NewRequestModal from './components/NewRequestModal';
import RequestCard from './components/RequestCard';

function App() {
  const [requests, setRequests] = useState(data.requests);
  const [activeTab, setActiveTab] = useState('All Request');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { name: 'All Request', count: requests.length },
    { name: 'Saved Request', count: requests.filter(r => r.status === 'Saved').length },
    { name: 'Pending Request', count: requests.filter(r => r.status === 'Pending').length },
    { name: 'Approved Request', count: requests.filter(r => r.status === 'Approved').length },
    { name: 'Rejected Request', count: requests.filter(r => r.status === 'Rejected').length },
  ];

  const filteredRequests = activeTab === 'All Request'
    ? requests
    : requests.filter(r => `${r.status} Request` === activeTab);

  const handleAddRequest = (newRequest) => {
    const request = {
      id: requests.length + 1,
      title: "<ETDG Topic> - Cycle 11 - 2025",
      status: "Saved",
      projects: 2,
      totalResources: newRequest.fte + newRequest.ew,
      date: "Dec 8, 2025",
      requester: "John Doe",
      ...newRequest
    };
    setRequests([request, ...requests]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-primus-blue text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide">P R I M U S</h1>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title and New Request Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Resourcing Request Portal</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primus-blue text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <span className="text-xl">+</span>
            New Request
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-300 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-3 px-2 font-medium transition ${activeTab === tab.name
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              {tab.name.includes('All') ? (
                <>
                  <span className="mr-2">📋</span>
                  {tab.name}
                </>
              ) : (
                `${tab.name} (${tab.count})`
              )}
            </button>
          ))}
        </div>

        {/* Request List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <NewRequestModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddRequest}
          projectTeams={data.projectTeams}
          etdgTopics={data.etdgTopics}
        />
      )}
    </div>
  );
}

export default App;
