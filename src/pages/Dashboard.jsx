import React from 'react';
import OrderOverview from '../components/dashboard/OrderOverview';

import RecentApplications from '../components/Table/RecentApplications';

const Dashboard = () => {
    return (
        <div>
            <h2 className='text-xl font-medium pb-6'>Dashboard Overview</h2>
            <OrderOverview/>
            
      
            <h2 className='text-xl font-medium pb-6'>Recent Applications</h2>
            <RecentApplications/>
        </div>
    );
};

export default Dashboard;