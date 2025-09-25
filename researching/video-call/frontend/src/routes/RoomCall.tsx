import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
("use client");
import React from "react";
// import { useRoom } from '@/context/room';
// import { useUser } from '@/context/user';
// import { useOffer } from '@/context/offer';
// import { useAnswer } from '@/context/answer';
// import { useStream } from '@/context/stream';
import {
  addIce,
  closePeerConnection,
  getCallStarterStatus,
  getPeerConnection,
  peerConnectionIcecandidate,
  peerSetRemoteDescription,
  setupDataChannel,
  setupTheAnswer,
  setupTheOffer,
} from "@/utils/peerConnection";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import MicrophoneSVG from "@/assets/icons/microphone";
import MicrophoneOffSVG from "@/assets/icons/microphoneOff";
import VideoSVG from "@/assets/icons/video";
import VideoOffSVG from "@/assets/icons/videoOff";
import EndCallSVG from "@/assets/icons/endCall";
import CallerUserSVG from "@/assets/icons/callerUserSVG";
import { useStream } from "@/contexts/stream";

export default function RoomCall() {
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Read token from query string
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const t = qs.get("token");
    if (!t) {
      setError("Missing token in URL (?token=...)");
    } else {
      setToken(t);
    }
  }, []);

  const [remoteVideo, setRemoteVideo] = useState<HTMLVideoElement>();
  const [localVideo, setLocalVideo] = useState<HTMLVideoElement>();

  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        const localVideoData = document.getElementById(
          "localStream",
        ) as HTMLVideoElement;

        setLocalVideo(localVideoData);

        if (localVideoData && localVideoData instanceof HTMLVideoElement) {
          localVideoData.srcObject = stream;
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (e: any) {
        setError(e?.message || "Unable to access camera/microphone");
      }
    }
    getMedia();
  }, []);

  const roomLabel = useMemo(() => id ?? "unknown", [id]);

  const [loading, setLoading] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const {
    localStream,
    setStream,
    remoteStream,
    pauseAudio,
    pauseVideo,
    resumeAudio,
    resumeVideo,
    stopMediaStream,
  } = useStream();

  function endCallFunction() {
    //TODO
  }

  const [remoteStreams, setRemoteStreams] = useState([
    {
      id: "1",
      stream: null,
    },
  ]);

  useEffect(() => {
    if (localStream) {
      const localVideoData = document.getElementById(
        "localStream",
      ) as HTMLVideoElement;

      if (localVideoData && localVideoData instanceof HTMLVideoElement) {
        localVideoData.srcObject = localStream;
      }
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream) {
      const remoteVideoData = document.getElementById(
        "remoteStream",
      ) as HTMLVideoElement;

      if (remoteVideoData && remoteVideoData instanceof HTMLVideoElement) {
        remoteVideoData.srcObject = remoteStream;
      }
    }
  }, [remoteStream]);

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    setupChannel();
  }, []);

  const setupChannel = async () => {
    setLoading(true);

    await setStream();
    await setupDataChannel("room-1");

    const pc = getPeerConnection();

    setLoading(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <main className="flex w-screen h-screen items-top justify-center min-w-[320px] min-h-[500px] ">
        {loading && (
          <div className="z-20 bg-background absolute h-screen w-screen gap-x-5 flex justify-center items-center">
            <p className="animate-bounce text-4xl duration-500 delay-500">::</p>
            <p className="animate-bounce text-4xl duration-500 delay-100">::</p>
            <p className="animate-bounce text-4xl duration-500 delay-500">::</p>
            <p className="animate-bounce text-4xl duration-500 delay-100">::</p>
            <p className="animate-bounce text-4xl duration-500 delay-500">::</p>
            <p className="animate-bounce text-4xl duration-500 delay-100">::</p>
            <p className="animate-bounce text-4xl duration-500 delay-500">::</p>
          </div>
        )}

        <div className="max-w-[1280px] relative w-full h-full flex flex-col justify-start items-top px-[3%] pt-0 space-y-4">
          <div className="max-h-[900px] h-[91%] w-full bg-green-200 rounded-md relative overflow-hidden mt-4">
            {/* remote participants */}
            <div
              className="w-full h-full grid gap-2 p-2"
              style={{
                gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
              }}
            >
              {remoteStreams.length > 0 ? (
                remoteStreams.map((peer) => (
                  <div
                    key={peer.id}
                    className="relative bg-black rounded-md overflow-hidden flex items-center justify-center"
                  >
                    <video
                      id="localStream"
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* fallback avatar */}
                    <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
                      <CallerUserSVG className="w-16 h-16 opacity-70" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center text-black w-full h-full">
                  <CallerUserSVG className="w-32 h-32" />
                </div>
              )}
            </div>

            {/* local stream floating window */}
            <div
              className="min-w-[120px] w-[40%] sm:w-[30%] md:w-[20%] lg:w-[20%]
      absolute bottom-[2.5%] right-[2.5%] aspect-square bg-black 
      rounded-md overflow-hidden shadow-lg border border-white/20"
            >
              <video
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center text-green-200 pointer-events-none">
                <CallerUserSVG className="w-20 h-20" />
              </div>
            </div>
          </div>

          {/* controls */}
          <div>
            <Card className=" mb-10 text-white bg-black">
              <CardContent className="p-2 ">
                <ToggleGroup type="multiple" className="gap-x-4">
                  <ToggleGroupItem
                    value="bold"
                    aria-label="Toggle bold"
                    onClick={() => {
                      if (micOn) {
                        pauseAudio();
                        setMicOn(false);
                      } else {
                        resumeAudio();
                        setMicOn(true);
                      }
                    }}
                  >
                    {micOn ? (
                      <MicrophoneSVG className="h-8 w-8" />
                    ) : (
                      <MicrophoneOffSVG className="h-8 w-8 text-red-400" />
                    )}
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="italic"
                    aria-label="Toggle italic"
                    onClick={() => {
                      if (videoOn) {
                        pauseVideo();
                        setVideoOn(false);
                      } else {
                        resumeVideo();
                        setVideoOn(true);
                      }
                    }}
                  >
                    {videoOn ? (
                      <VideoSVG className="h-8 w-8" />
                    ) : (
                      <VideoOffSVG className="h-8 w-8 text-red-400" />
                    )}
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                    onClick={() => {
                      endCallFunction();
                    }}
                  >
                    <EndCallSVG className="h-8 w-8" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <h1>Room {roomLabel}</h1>
      {!error && !token && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
          marginTop: 16,
        }}
      >
        <div
          style={{
            background: "#111",
            borderRadius: 8,
            overflow: "hidden",
            position: "relative",
            aspectRatio: "16/9",
          }}
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 8,
              color: "#fff",
              fontSize: 12,
            }}
          >
            You
          </div>
        </div>
        {/* Remote tiles will be added after signaling is wired */}
      </div>
    </div>
  );
}
