import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, Filler, LineElement, PointElement, CategoryScale, LinearScale);

// eslint-disable-next-line react/prop-types
function UserActivityChart({ allUserData }) {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (allUserData && allUserData.length > 0) {
            
            const monthlyCounts = {
                active: {},
                inactive: {},
                logins: {}
            };

          
            // eslint-disable-next-line react/prop-types
            allUserData.forEach(user => {
                const date = new Date(user.activityDate);
                const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
                const status = user.userStatus;

                if (!monthlyCounts[status][monthYear]) {
                    monthlyCounts[status][monthYear] = 0;
                }
                monthlyCounts[status][monthYear]++;

                
                if (!monthlyCounts.logins[monthYear]) {
                    monthlyCounts.logins[monthYear] = 0;
                }
                monthlyCounts.logins[monthYear]++;
            });

          
            const labels = Array.from(new Set([...Object.keys(monthlyCounts.active), ...Object.keys(monthlyCounts.inactive), ...Object.keys(monthlyCounts.logins)])).sort();
            const activeDataPoints = labels.map(label => monthlyCounts.active[label] || 0);
            const inactiveDataPoints = labels.map(label => monthlyCounts.inactive[label] || 0);
            const loginsDataPoints = labels.map(label => monthlyCounts.logins[label] || 0);

            setChartData({
                labels: labels.map(label => {
                    const [year, month] = label.split('-');
                    return `${month}/${year}`;
                }),
                datasets: [
                    {
                        label: 'Active Users',
                        data: activeDataPoints,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: 'Inactive Users',
                        data: inactiveDataPoints,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: 'Number of Logins',
                        data: loginsDataPoints,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: false,
                        tension: 0.1
                    }
                ]
            });
        }
    }, [allUserData]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Users / Logins'
                },
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '350px',display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default UserActivityChart;
