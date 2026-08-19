import { ICONS } from "../../config/constants";

export default function DynamicMascot({ state = "idle", size = 85, style = {} }) {
  // Map states to the high-quality pre-rendered transparent webp assets
  let imgSrc = "/assets/mascot/mascot_idle.webp"; // default friendly pose

  if (state === "entering") {
    imgSrc = "/assets/mascot/mascot_waving.webp";
  } else if (state === "watering") {
    imgSrc = "/assets/mascot/mascot_watering.webp";
  } else if (state === "celebrating") {
    imgSrc = "/assets/mascot/mascot_celebrating.webp";
  } else if (state === "meditating") {
    imgSrc = "/assets/mascot/mascot_meditating.webp";
  }

  // Dynamic CSS animation classes for keyframe triggers
  const getAnimationClass = () => {
    if (state === "entering") return "is-entering";
    if (state === "watering") return "is-watering";
    if (state === "celebrating") return "is-celebrating";
    return "is-idle";
  };

  return (
    <div
      style={{
        width: size,
        height: size * 1.15,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <style>{`
        /* 1. Idle breath (Floating up/down) */
        @keyframes mascotBreath {
          0%, 100% { 
            transform: translateY(0) scale(1); 
          }
          50% { 
            transform: translateY(-8px) scale(1.015); 
          }
        }

        /* 2. Idle sway (Subtle rotation shift) */
        @keyframes mascotSway {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1.2deg); }
          75% { transform: rotate(1.2deg); }
        }

        /* 3. Watering shake (Replaces arm wave for single PNG layer) */
        @keyframes mascotShake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-3px) rotate(-1.5deg); }
          40% { transform: translateX(3px) rotate(1.5deg); }
          60% { transform: translateX(-2px) rotate(-0.8deg); }
          80% { transform: translateX(2px) rotate(0.8deg); }
        }

        /* 4. Celebrate jump (Pixar-style spring/stretch bounce) */
        @keyframes mascotJump {
          0% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-44px) scale(1.04); }
          55% { transform: translateY(-16px) scale(0.96); }
          80% { transform: translateY(-4px) scale(1.01); }
          100% { transform: translateY(0) scale(1); }
        }

        /* 5. Entrance slide-in from bottom */
        @keyframes mascotEnter {
          0% { 
            transform: translateY(80px) scale(0.85); 
            opacity: 0;
          }
          65% {
            transform: translateY(-10px) scale(1.03);
            opacity: 1;
          }
          100% { 
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .mascot-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transform-origin: center bottom;
          will-change: transform;
        }

        /* Idle State - Combined breathing and sway at different frequencies for organic movement */
        .mascot-img.is-idle {
          animation: 
            mascotBreath 3.5s ease-in-out infinite,
            mascotSway 6s ease-in-out infinite;
        }

        /* Entrance State */
        .mascot-img.is-entering {
          animation: mascotEnter 1.2s cubic-bezier(0.25, 1.3, 0.5, 1) both;
        }

        /* Active Actions State (Watering shake) */
        .mascot-img.is-watering {
          animation: mascotShake 0.4s ease-in-out 3;
        }

        /* Level-Up Celebration State */
        .mascot-img.is-celebrating {
          animation: mascotJump 1.2s cubic-bezier(0.25, 1.3, 0.5, 1) both;
        }
      `}</style>

      <img
        src={imgSrc}
        alt="Mascot"
        className={`mascot-img ${getAnimationClass()}`}
        onError={(e) => {
          e.target.src = "/assets/mascot/mascot_idle.webp";
        }}
      />
    </div>
  );
}
