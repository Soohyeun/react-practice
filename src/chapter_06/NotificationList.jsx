import React from "react";
import Notification from "./Notification";

const reserveNotifications = [
    {
        message: "Hello, this is today's schedule."
    },
    {
        message: "It's lunch time."
    },
    {
        message: "Meeting will be started in a minute."
    }
];

var timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        };
    }

    componentDidMount () {
        const {notifications} = this.state;
        timer = setInterval(() => {
            if(notifications.length < reserveNotifications.length) {
                const index = notifications.length;
                notifications.push(reserveNotifications[index]);
                this.setState({
                    notifications: notifications,
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    render() {
        return (
            <div>
                {this.state.notifications.map((notification) => {
                    return <Notification message = {notification.message} />;
                })}
            </div>
        );
    }
}

export default NotificationList;