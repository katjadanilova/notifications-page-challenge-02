/// <reference types="react-scripts" />

import React, {useState} from 'react';
import './App.css';
import angela from "./images/avatar-angela-gray.webp";
import mark from "./images/avatar-mark-webber.webp";
import jacob from "./images/avatar-jacob-thompson.webp";
import kimberly from "./images/avatar-kimberly-smith.webp";
import anna from "./images/avatar-anna-kim.webp";
import nathan from "./images/avatar-nathan-peterson.webp";
import rizky from "./images/avatar-rizky-hasanuddin.webp";
import chess from "./images/image-chess.webp"
import classNames from "classnames";

type NotificationProps = {
    imageName: string,
    name: string,
    text: string,
    time: string,
    eventName?: string,
    clubName?: string,
    message?: string,
    picture?: string,
    onClick: () => void,
    allRead: boolean
}

function Notification(props: NotificationProps) {
    const [read, setRead] = useState(false)

    const areAllRead = () => {
        return !read && !props.allRead;
    }

    return <div className={classNames("full-notification", {"read": read}, {"read": props.allRead})}
                onClick={() => {
                    setRead(true)
                    props.onClick()
                }}>

        <div className="image">
            <img src={props.imageName} alt={props.name + "photo"}/>
        </div>

        <div className="notification-content">
            <div>
                <div className="text-container">
                    <strong className="name">{props.name}</strong>
                    <p className="text">{props.text}</p>
                    <strong className={classNames("event-name", {"club-name": props.clubName})}>
                        {props.eventName || props.clubName}
                    </strong>

                    {areAllRead() && <span className="unread"></span>}


                </div>
                <p className="time">{props.time}</p>
            </div>


            {props.message ? <p className="message">{props.message}</p> : <></>}
        </div>

        {props.picture &&
            <div className="picture-container">
                <img className="picture" src={props.picture} alt="Original message mentioned in the notification"/>
            </div>
        }
    </div>
}

const notifications = [
    {
        imageName: mark,
        name: "Mark Webber",
        text: "reacted to your recent post",
        eventName: "My first tournament today!",
        time: "1m ago"
    },
    {
        imageName: angela,
        name: "Angela Gray",
        text: "followed you",
        time: "5m ago"
    },
    {
        imageName: jacob,
        name: "Jacob Thompson",
        text: "has joined your group",
        clubName: "Chess Club",
        time: "1 day ago"
    },
    {
        imageName: rizky,
        name: "Rizky Hasanuddin",
        text: "sent you a private message",
        message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
        time: "5 days ago"
    },
    {
        imageName: kimberly,
        name: "Kimberly Smith",
        text: "commented on your picture",
        picture: chess,
        time: "1 week ago"
    },
    {
        imageName: nathan,
        name: "Nathan Peterson",
        text: "reacted to your recent post",
        eventName: "5 end-game strategies to increase your win rate",
        time: "2 weeks ago"
    },
    {
        imageName: anna,
        name: "Anna Kim",
        text: "left the group",
        clubName: "Chess Club",
        time: "2 weeks ago"
    },
]

function App() {
    const [readNotifications, setReadNotifications] = useState<string[]>([])

    const handleClick = (notificationName: string) => {
        if (readNotifications.length === 0) {
            setReadNotifications(arr => [...arr, notificationName])
        } else {
            if (!readNotifications.includes(notificationName))
                setReadNotifications(arr => [...arr, notificationName])
        }
    }

    const setAllRead = () => {
        let read = []
        for (const item of notifications) {
            read.push(item.name)
        }
        setReadNotifications(read)
    }

    const areAllRead = () => {
        return readNotifications.length === notifications.length;
    }

    return (
        <div className="app">
            <div className="notifications-container">
                <div className="header">
                    <div className="counter-container">
                        <h1>Notifications</h1>
                        <div aria-label="Counter"
                             className="counter">{notifications.length - readNotifications.length}</div>
                    </div>
                    <button onClick={setAllRead} className="mark-read-button">Mark all as read</button>
                </div>
                {
                    notifications.map((item) => <Notification
                        key={item.name}
                        name={item.name}
                        imageName={item.imageName}
                        text={item.text}
                        time={item.time}
                        eventName={item.eventName}
                        clubName={item.clubName}
                        message={item.message}
                        picture={item.picture}
                        onClick={() => handleClick(item.name)}
                        allRead={areAllRead()}
                    />)
                }
            </div>
        </div>
    );
}

export default App;
