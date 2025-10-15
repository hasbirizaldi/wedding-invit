import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = new Date(targetDate) - now;

    if (difference <= 0) return null;

    return {
      hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
      jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
      menit: Math.floor((difference / (1000 * 60)) % 60),
      detik: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(timer); // cleanup saat unmount
  }, [targetDate]);

  if (!timeLeft) {
    return <p>Waktu telah habis!</p>;
  }

  return (
    <div className="text-lg font-noto flex gap-2">
      <div className="animated-border lg:w-22 w-16 lg:h-22 h-16 flex flex-col justify-center items-center bg-rose-950 text-slate-100 shadow-ku lg:rounded-3xl rounded-lg">
        <p className="lg:text-4xl text-2xl font-semibold animated-text">{timeLeft.hari}</p>
        <p className="lg:text-sm text-[10px] animated-text">DAYS</p>
      </div>

      <div className="animated-border lg:w-22 w-16 lg:h-22 h-16 flex flex-col justify-center items-center bg-rose-950 text-slate-100 shadow-ku lg:rounded-3xl rounded-lg">
        <p className="lg:text-4xl text-2xl font-semibold">{timeLeft.jam}</p>
        <p className="lg:text-sm text-[10px]">HOURS</p>
      </div>
      <div className="animated-border lg:w-22 w-16 lg:h-22 h-16 flex flex-col justify-center items-center bg-rose-950 text-slate-100 shadow-ku lg:rounded-3xl rounded-lg">
        <p className="lg:text-4xl text-2xl font-semibold">{timeLeft.menit}</p>
        <p className="lg:text-sm text-[10px]">MINUTES</p>
      </div>
      <div className="animated-border lg:w-22 w-16 lg:h-22 h-16 flex flex-col justify-center items-center bg-rose-950 text-slate-100 shadow-ku lg:rounded-3xl rounded-lg">
        <p className="lg:text-4xl text-2xl font-semibold"> {timeLeft.detik}</p>
        <p className="lg:text-sm text-[10px]">SECONDS</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
