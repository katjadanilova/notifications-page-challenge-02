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
}

function Notification(props: NotificationProps) {
    const [read, setRead] = useState(false)

    return <div className={classNames("full-notification", {"read": read})}
                onClick={() => {
                    setRead(true)
                    props.onClick()
                }}>

        <picture className="image">
            <img src={props.imageName} alt={props.name + "photo"}/>
        </picture>

        <div className="notification-content">
            <div className="content">
                <div className="text-container">
                    <div className="name">{props.name}</div>
                    <div className="text">{props.text}</div>
                    <div className={classNames("event-name", {"club-name": props.clubName})}>
                        {props.eventName || props.clubName}
                    </div>

                        {!read && <span className="unread"></span>}


                </div>
                <div className="time">{props.time}</div>
            </div>


            {props.message ? <div className="message">{props.message}</div> : <></>}
        </div>

        {props.picture &&
            <picture className="picture-container">
                <img className="picture" src={props.picture} alt="reference to an image"/>
            </picture>
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

    const [unreadNotifications, setUnreadNotifications] = useState(notifications.length)

    const handleClick = () => {
        setUnreadNotifications(n => n - 1);
    }

    return (
        <div className="app">
            <div className="notifications-container">
                <div className="header">

                    <div className="counter-container">
                        <h1>Notifications</h1>
                        <div className="counter">{unreadNotifications}</div>
                    </div>
                    <button className="mark-read-button">Mark all as read</button>
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
                        onClick={handleClick}
                    />)
                }

            </div>
        </div>
    );
}

export default App;
