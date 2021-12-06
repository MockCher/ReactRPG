import { useEffect, useState } from "react";
import { FogOfWar } from "./components/FogOfWar";
import { StatusBar } from "./components/StatusBar";
import Map from "./components/Map";

import "./styles.css";
import { skins } from "./configs/skins";
import { keys } from "./configs/keyBindings";

const tile_size = 32;

const directions = {
  south: -0,
  west: -tile_size,
  east: -tile_size * 2,
  north: -tile_size * 3
};

const world = {
  map: "/assets/grasslands_1.png",
  bounderies: {
    left: 1,
    right: window.innerWidth - tile_size - 1,
    top: 1,
    bottom: window.innerHeight - tile_size - 1
  },
  objects: [
    {
      type: "barrel",
      position: {
        playerPosX: 1 * tile_size,
        playerPosY: 1 * tile_size
      }
    },
    {
      type: "wall",
      position: {
        playerPosX: 3 * tile_size,
        playerPosY: 3 * tile_size
      }
    },
    {
      type: "enemy",
      position: {
        playerPosX: 5 * tile_size,
        playerPosY: 5 * tile_size
      }
    },
    {
      type: "enemy",
      position: {
        playerPosX: 7 * tile_size,
        playerPosY: 2 * tile_size
      }
    }
  ]
};

export default function App() {
  const [playerPosX, setPlayerPosX] = useState(0);
  const [playerPosY, setPlayerPosY] = useState(-100);
  const [playerDirection, setPlayerDirection] = useState(directions.west);
  const [playerHealth, setPlayerHelth] = useState(100);
  const [lockedFields, setLockedFields] = useState([]);

  useEffect(() => {
    if (playerPosY < 0)
      setPlayerPosY(
        window.innerHeight - (window.innerHeight % tile_size) - tile_size
      );
    findLockedFields(world.objects);
    document.addEventListener("keydown", _handleKeydown);
    return () => document.removeEventListener("keydown", _handleKeydown);
  }, [playerPosX, playerPosY, playerDirection]);

  const findLockedFields = (arr) => {
    let lockedFields = [];
    arr.forEach((e) =>
      lockedFields.push({ x: e.position.playerPosX, y: e.position.playerPosY })
    );
    setLockedFields(lockedFields);
  };
  const _handleKeydown = (event) => {
    let currentPosition = { x: playerPosX, y: playerPosY };
    let nextPosition = currentPosition;

    switch (event.keyCode) {
      case keys.W:
      case keys.ARROW_UP:
        nextPosition.y -= tile_size;
        setPlayerDirection(directions.north);
        break;
      case keys.S:
      case keys.ARROW_DOWN:
        nextPosition.y += tile_size;
        setPlayerDirection(directions.south);
        break;
      case keys.A:
      case keys.ARROW_LEFT:
        nextPosition.x -= tile_size;
        setPlayerDirection(directions.west);
        break;
      case keys.D:
      case keys.ARROW_RIGHT:
        nextPosition.x += tile_size;
        setPlayerDirection(directions.east);
        break;
      default:
        break;
    }

    if (
      lockedFields.find((e) => e.x === nextPosition.x && e.y === nextPosition.y)
    )
      setPlayerHelth(playerHealth - 10);
    else if (
      nextPosition.x + 1 < world.bounderies.left ||
      nextPosition.x + 1 > world.bounderies.right ||
      nextPosition.y + 1 < world.bounderies.top ||
      nextPosition.y + 1 > world.bounderies.bottom
    ) {
      console.log("stop!");
    } else {
      setPlayerPosX(nextPosition.x);
      setPlayerPosY(nextPosition.y);
    }
  };

  return (
    <div className="Game">
      <Map map={world.map} tile_size={tile_size}>
        <Sprite
          type="player"
          skin={skins.f1}
          direction={playerDirection}
          color="transparent"
          pos={{ playerPosX, playerPosY }}
        />
        {world.objects.map((o, i) => (
          <Sprite
            key={i}
            type="enemy"
            direction={directions.west}
            skin={skins.e1}
            pos={o.position}
          />
        ))}
      </Map>
      {/* <FogOfWar clearX={playerPosX - 170} clearY={playerPosY - 135} /> */}
      <Overlay>
        <Container>
          <StatusBar color="red" value={playerHealth} maxvalue={100} />
          <StatusBar color="blue" value={50} maxvalue={100} />
          <StatusBar color="green" value={30} maxvalue={100} />
        </Container>
      </Overlay>
    </div>
  );
}

const Container = ({ children }) => {
  return <div className="hud-container">{children}</div>;
};

const Controlls = () => {
  return (
    <div className="controlls-wrapper">
      <button />
    </div>
  );
};

const Sprite = ({ type, skin, pos, direction = directions.north }) => {
  const { playerPosX, playerPosY } = pos;
  const [playerDirection, setPlayerDirection] = useState(direction);

  useEffect(() => {
    setPlayerDirection(direction);
  }, [direction, playerDirection]);

  return (
    <div
      style={{
        transition: "top 0.7s ease, left 0.7s ease",
        position: "absolute",
        height: "32px",
        width: "32px",
        top: `${playerPosY}px`,
        left: `${playerPosX}px`,
        backgroundImage: `url(${skin})`,
        backgroundPositionY: `${direction}px`
        // backgroundPosition: `-${1}px -${1}px`
      }}
      className="sprite"
    />
  );
};

const Overlay = ({ children }) => {
  return <div className="hud">{children}</div>;
};
