import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/utils/trpc";
import { useEffect, useRef, useState } from "react";
import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  RoomContext,
} from "@livekit/components-react";
import { Room, RoomEvent, Track } from "livekit-client";
import "@livekit/components-styles";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const trpc = useTRPC();
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  const LIVEKIT_URL = "wss://quochuydev-i4asls1o.livekit.cloud";

  const [room] = useState(
    () =>
      new Room({
        adaptiveStream: true,
        dynacast: true,
      }),
  );

  useEffect(() => {
    let mounted = true;

    const connect = async () => {
      const token = await fetch("http://localhost:3000/get-token").then((r) =>
        r.text(),
      );

      if (mounted) {
        await room.connect(LIVEKIT_URL, token);
      }
    };

    connect();

    room.on("participantConnected", (p) => {
      console.log("Participant joined:", p.identity);
    });

    room.on("trackSubscribed", (track, pub, participant) => {
      console.log("Subscribed to:", track.kind, "from", participant.identity);
    });

    room.on(RoomEvent.Disconnected, () => {
      console.log("Left room");
    });

    return () => {
      mounted = false;
      room.disconnect();
    };
  }, [room]);

  return (
    <RoomContext.Provider value={room}>
      <div data-lk-theme="default" style={{ height: "100vh" }}>
        <MyVideoConference />
        <RoomAudioRenderer />
        <ControlBar />
      </div>
    </RoomContext.Provider>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      {
        source: Track.Source.Camera,
        withPlaceholder: true,
      },
      {
        source: Track.Source.ScreenShare,
        withPlaceholder: false,
      },
    ],
    {
      onlySubscribed: false,
    },
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
