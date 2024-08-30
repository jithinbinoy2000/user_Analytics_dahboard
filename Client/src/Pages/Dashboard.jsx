// Import necessary dependencies
// import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import '../Styles/dashboard.css';
import ActivePieChart from "../Components/AcivePieChart";
import UserActivityChart from "../Components/UserActivityChart";
import Table from "../Components/Table";
// import List from "../Components/List";

function Dashboard() {
    const [allUserData, setAllUserData] = useState([]);

    const fetchAllData = async () => {
        try {
            const response =[{"username":"emilyd","email":"sample@example.com","userStatus":"active","recentLogin":"2024-08-23T17:50:00Z","signupDate":"2023-12-01T10:00:00Z","profileImage":"https://dummyjson.com/icon/emilys/128","activityDate":"2024-08-22"},{"username":"michaelw","email":"michaelw@example.com","userStatus":"inactive","recentLogin":"2024-06-14T13:05:00Z","signupDate":"2023-08-15T14:25:00Z","profileImage":"https://dummyjson.com/icon/michaelw/128","activityDate":"2024-06-13"},{"username":"sophiab","email":"sophiab@example.com","userStatus":"active","recentLogin":"2024-08-26T08:20:00Z","signupDate":"2024-01-10T11:30:00Z","profileImage":"https://dummyjson.com/icon/sophiab/128","activityDate":"2024-08-25"},{"username":"jamesd","email":"jamesd@example.com","userStatus":"inactive","recentLogin":"2024-06-14T13:05:00Z","signupDate":"2023-08-15T14:25:00Z","profileImage":"https://dummyjson.com/icon/jamesd/128","activityDate":"2024-06-13"},{"username":"emmaj","email":"emmaj@example.com","userStatus":"active","recentLogin":"2024-08-23T17:50:00Z","signupDate":"2023-12-01T10:00:00Z","profileImage":"https://dummyjson.com/icon/emmaj/128","activityDate":"2024-08-22"},{"username":"oliviaw","email":"oliviaw@example.com","userStatus":"active","recentLogin":"2024-08-24T14:30:00Z","signupDate":"2024-03-08T09:45:00Z","profileImage":"https://dummyjson.com/icon/oliviaw/128","activityDate":"2024-08-23"},{"username":"alexanderj","email":"alexanderj@example.com","userStatus":"inactive","recentLogin":"2024-05-12T11:10:00Z","signupDate":"2022-09-14T15:30:00Z","profileImage":"https://dummyjson.com/icon/alexanderj/128","activityDate":"2024-05-11"},{"username":"avat","email":"avat@example.com","userStatus":"active","recentLogin":"2024-08-22T13:25:00Z","signupDate":"2023-07-19T08:00:00Z","profileImage":"https://dummyjson.com/icon/avat/128","activityDate":"2024-08-21"},{"username":"ethanm","email":"ethanm@example.com","userStatus":"inactive","recentLogin":"2024-04-15T16:20:00Z","signupDate":"2022-12-10T10:30:00Z","profileImage":"https://dummyjson.com/icon/ethanm/128","activityDate":"2024-04-14"},{"username":"isabellad","email":"isabellad@example.com","userStatus":"active","recentLogin":"2024-08-24T11:35:00Z","signupDate":"2023-11-10T09:00:00Z","profileImage":"https://dummyjson.com/icon/isabellad/128","activityDate":"2024-08-23"},{"username":"liamg","email":"liamg@example.com","userStatus":"inactive","recentLogin":"2024-03-30T08:55:00Z","signupDate":"2022-08-10T16:20:00Z","profileImage":"https://dummyjson.com/icon/liamg/128","activityDate":"2024-03-29"},{"username":"miar","email":"miar@example.com","userStatus":"active","recentLogin":"2024-08-25T18:45:00Z","signupDate":"2023-04-05T12:10:00Z","profileImage":"https://dummyjson.com/icon/miar/128","activityDate":"2024-08-24"},{"username":"noahh","email":"noahh@example.com","userStatus":"inactive","recentLogin":"2024-07-01T10:00:00Z","signupDate":"2022-10-20T14:55:00Z","profileImage":"https://dummyjson.com/icon/noahh/128","activityDate":"2024-06-30"},{"username":"charlottem","email":"charlottem@example.com","userStatus":"active","recentLogin":"2024-08-25T10:20:00Z","signupDate":"2023-08-01T08:15:00Z","profileImage":"https://dummyjson.com/icon/charlottem/128","activityDate":"2024-08-24"},{"username":"williamg","email":"williamg@example.com","userStatus":"inactive","recentLogin":"2024-02-28T12:40:00Z","signupDate":"2023-01-30T15:10:00Z","profileImage":"https://dummyjson.com/icon/williamg/128","activityDate":"2024-02-27"},{"username":"averyp","email":"averyp@example.com","userStatus":"active","recentLogin":"2024-08-24T12:15:00Z","signupDate":"2023-02-11T11:00:00Z","profileImage":"https://dummyjson.com/icon/averyp/128","activityDate":"2024-08-23"},{"username":"evelyns","email":"evelyns@example.com","userStatus":"inactive","recentLogin":"2024-04-23T14:10:00Z","signupDate":"2022-11-02T09:25:00Z","profileImage":"https://dummyjson.com/icon/evelyns/128","activityDate":"2024-04-22"},{"username":"logant","email":"logant@example.com","userStatus":"active","recentLogin":"2024-08-23T16:30:00Z","signupDate":"2023-03-25T12:05:00Z","profileImage":"https://dummyjson.com/icon/logant/128","activityDate":"2024-08-22"},{"username":"abigailr","email":"abigailr@example.com","userStatus":"inactive","recentLogin":"2024-01-08T09:30:00Z","signupDate":"2022-11-19T14:50:00Z","profileImage":"https://dummyjson.com/icon/abigailr/128","activityDate":"2024-01-07"},{"username":"jacksone","email":"jacksone@example.com","userStatus":"active","recentLogin":"2024-08-25T15:15:00Z","signupDate":"2023-06-03T11:00:00Z","profileImage":"https://dummyjson.com/icon/jacksone/128","activityDate":"2024-08-24"},{"username":"madisonc","email":"madisonc@example.com","userStatus":"inactive","recentLogin":"2024-07-08T14:25:00Z","signupDate":"2023-09-21T16:05:00Z","profileImage":"https://dummyjson.com/icon/madisonc/128","activityDate":"2024-07-07"},{"username":"elijahs","email":"elijahs@example.com","userStatus":"active","recentLogin":"2024-08-24T13:05:00Z","signupDate":"2023-05-17T12:30:00Z","profileImage":"https://dummyjson.com/icon/elijahs/128","activityDate":"2024-08-23"},{"username":"chloem","email":"chloem@example.com","userStatus":"inactive","recentLogin":"2024-01-17T07:40:00Z","signupDate":"2022-07-05T10:30:00Z","profileImage":"https://dummyjson.com/icon/chloem/128","activityDate":"2024-01-16"},{"username":"mateon","email":"mateon@example.com","userStatus":"active","recentLogin":"2024-08-26T07:45:00Z","signupDate":"2023-11-01T14:00:00Z","profileImage":"https://dummyjson.com/icon/mateon/128","activityDate":"2024-08-25"},{"username":"harpere","email":"harpere@example.com","userStatus":"inactive","recentLogin":"2024-02-12T10:20:00Z","signupDate":"2022-09-08T15:00:00Z","profileImage":"https://dummyjson.com/icon/harpere/128","activityDate":"2024-02-11"},{"username":"evelyng","email":"evelyng@example.com","userStatus":"active","recentLogin":"2024-08-25T10:20:00Z","signupDate":"2023-08-01T08:15:00Z","profileImage":"https://dummyjson.com/icon/evelyng/128","activityDate":"2024-08-24"},{"username":"danielc","email":"danielc@example.com","userStatus":"inactive","recentLogin":"2024-03-15T12:30:00Z","signupDate":"2022-12-28T10:10:00Z","profileImage":"https://dummyjson.com/icon/danielc/128","activityDate":"2024-03-14"},{"username":"lilyb","email":"lilyb@example.com","userStatus":"active","recentLogin":"2024-08-26T09:00:00Z","signupDate":"2023-06-23T14:50:00Z","profileImage":"https://dummyjson.com/icon/lilyb/128","activityDate":"2024-08-25"},{"username":"henryh","email":"henryh@example.com","userStatus":"inactive","recentLogin":"2024-07-08T14:25:00Z","signupDate":"2023-09-21T16:05:00Z","profileImage":"https://dummyjson.com/icon/henryh/128","activityDate":"2024-07-07"},{"username":"addisonw","email":"addisonw@example.com","userStatus":"active","recentLogin":"2024-08-25T15:15:00Z","signupDate":"2023-06-03T11:00:00Z","profileImage":"https://dummyjson.com/icon/addisonw/128","activityDate":"2024-08-24"}]
            setAllUserData(response);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <div className="container">
            <Container>
                <Row>
                    <Col lg={10} md={8} sm={12}>
                        <div className="active-user-chart">
                            <UserActivityChart allUserData={allUserData} />
                        </div>
                    </Col>
                    <Col lg={2} md={4} sm={12}>
                        <div className="active-user-container">
                            <ActivePieChart allUserData={allUserData} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Table allUserData={allUserData} />
                    </Col>
                    
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;
