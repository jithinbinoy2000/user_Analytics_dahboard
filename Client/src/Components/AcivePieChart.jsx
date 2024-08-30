
//import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, ArcElement);

// eslint-disable-next-line react/prop-types
const ActivePieChart = ({ allUserData }) => {
    // eslint-disable-next-line react/prop-types
    const activeCount = allUserData.filter(user => user.userStatus === 'active').length;
    // eslint-disable-next-line react/prop-types
    const inactiveCount = allUserData.filter(user => user.userStatus === 'inactive').length;

    const data = {
        labels: ['Inactive Users', 'Active Users'],
        datasets: [{
            label: 'User Status',
            data: [inactiveCount, activeCount],
            backgroundColor: ['#296891','#2dcc70'],
            hoverOffset: 8
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '100%', height: '300px', position: 'relative', }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default ActivePieChart;
