"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./caique.module.scss";
import { MessageCircle, Volume2 } from "lucide-react";

const backToWorkDate = new Date(2023, 7, 1, 9, 0, 0, 0);

export default function Caique() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [timeLeft, setTimeLeft] = useState(1);
  const [rotate, setRotate] = useState(false);
  const [animationAudio, setAnimationAudio] = useState(false);

  useEffect(() => {
    setTimeLeft(backToWorkDate.getTime() - Date.now());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (rotate) {
      const timeout = setTimeout(() => setRotate(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [rotate]);

  useEffect(() => {
    const ref = audioRef.current;
    if (ref) {
      ref.addEventListener("ended", () => setAnimationAudio(false));
      return () => {
        ref.removeEventListener("ended", () => setAnimationAudio(false));
      };
    }
  }, [rotate]);

  const dateFormatted = useMemo(() => {
    const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
    const hours = Math.max(
      0,
      Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const minutes = Math.max(
      0,
      Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    );
    const seconds = Math.max(0, Math.floor((timeLeft % (1000 * 60)) / 1000));
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }, [timeLeft]);

  return (
    <div className={styles.content}>
      <audio controls ref={audioRef}>
        <source src="/canalha_1.mp3" type="audio/mpeg" />
      </audio>
      <h1>Vou retornar em:</h1>
      <table className={styles.counter}>
        <thead>
          <tr>
            <th>Dias</th>
            <th>Horas</th>
            <th>Minutos</th>
            <th>Segundos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{dateFormatted.days}</td>
            <td>{dateFormatted.hours}</td>
            <td>{dateFormatted.minutes}</td>
            <td>{dateFormatted.seconds}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.image}>
        <Image
          className={`${rotate ? styles.rotate : ""}`}
          src="/caique_miranha.png"
          width={300}
          height={300}
          alt="Caique Miranha"
        />
        <Volume2
          size={128}
          className={`${styles.volumeOn} ${
            animationAudio ? styles.audioAnimation : ""
          }`}
        />
        {animationAudio && <div className={styles.chatBalon}>O canalha!!</div>}
      </div>

      <section className={styles.butttons}>
        <button
          type="button"
          onClick={() => {
            audioRef.current?.play();
            setAnimationAudio(true);
          }}
        >
          Não vou dar M1
        </button>
        <button type="button" onClick={() => setRotate(true)}>
          Vou dar M1
        </button>
      </section>
    </div>
  );
}
