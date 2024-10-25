"use client";

import useUser from "@/app/hooks/useUser";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React from "react";
import { v4 as uuid } from "uuid";

const Room = ({ params }: { params: { roomid: string } }) => {
  const { fullName } = useUser();
  const roomID = params.roomid;

  let myMeeting: any = async (element: any) => {
    // generate Kit Token
    const appID = parseInt(process.env.NEXT_PUBLIC_API_KEY!);
    const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET_KEY!;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      uuid(),
      fullName || "user" + Date.now(),
      720
    );


    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Shareable link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      maxUsers: 10,
    });
  };

  return <div className="w-full h-screen" ref={myMeeting}></div>;
};

export default Room;