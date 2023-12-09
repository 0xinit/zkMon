import React, { useEffect, useState } from "react";
import house from "./imgAssets/house.png";
import playerIMG from "./imgAssets/player.png";
import backGround from "./imgAssets/backGround.png";
import pokeballIMG from "./imgAssets/pokeball.png";

const PokemonGame = () => {
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [terrainImageLoaded, setTerrainImageLoaded] = useState(false);
  const [houseImageLoaded, setHouseImageLoaded] = useState(false);
  const [pokeballImageLoaded, setPokeballImageLoaded] = useState(false);
  const [playerImageLoaded, setPlayerImageLoaded] = useState(false);
  const [objectSizes] = useState(20);
  const [speed] = useState(100);
  const [modifier] = useState(100);
  const [score, setScore] = useState(0);

  const [pokeball, setPokeball] = useState({
    x: 0,
    y: 0,
    spritePosition: 0,
    spriteItemDistance: 33,
    generatePosition: function () {
      do {
        this.x = Math.floor(Math.random() * 20) + 1;
        this.y = Math.floor(Math.random() * 16) + 4;
      } while (checkCollision(this.x, this.y));

      this.spritePosition = Math.floor(Math.random() * 4) + 0;
    },
  });

  const [player, setPlayer] = useState({
    x: 0,
    y: 0,
    currentDirection: "stand",
    direction: {
      stand: { x: 0, y: 0 },
      "down-1": { x: 17, y: 0 },
      "down-2": { x: 34, y: 0 },
      "up-1": { x: 125, y: 0 },
      "up-2": { x: 142, y: 0 },
      "left-1": { x: 69, y: 0 },
      "left-2": { x: 87, y: 0 },
      "right-1": { x: 160, y: 0 },
      "right-2": { x: 178, y: 0 },
    },
    move: function (direction) {
      const holdPlayer = { x: this.x, y: this.y };

      switch (direction) {
        case "left":
          this.x -= speed / modifier;
          this.currentDirection = "left-1";
          break;
        case "right":
          this.x += speed / modifier;
          this.currentDirection = "right-1";
          break;
        case "up":
          this.y -= speed / modifier;
          this.currentDirection = "up-1";
          break;
        case "down":
          this.y += speed / modifier;
          this.currentDirection = "down-1";
          break;
        default:
          break;
      }

      if (checkCollision(this.x, this.y)) {
        this.x = holdPlayer.x;
        this.y = holdPlayer.y;
      }

      if (this.x === pokeball.x && this.y === pokeball.y) {
        setScore(score + 1);
        pokeball.generatePosition();
      }

      update();
    },
  });

  const [terrainImage] = useState(new Image());
  const [houseImage] = useState(new Image());
  const [pokeballImage] = useState(new Image());
  const [playerImage] = useState(new Image());

  useEffect(() => {
    const canvasElement = document.getElementById("canvas");
    setCanvas(canvasElement);
    setCtx(canvasElement.getContext("2d"));
    setW(canvasElement.offsetWidth);
    setH(canvasElement.offsetHeight);
  }, []);

  useEffect(() => {
    if (ctx) {
      const terrainImg = new Image();
      terrainImg.onload = () => {
        setTerrainImageLoaded(true);
        assetsLoaded();
      };
      terrainImg.src = backGround;
      terrainImage.src = terrainImg.src;

      const houseImg = new Image();
      houseImg.onload = () => {
        setHouseImageLoaded(true);
        assetsLoaded();
      };
      houseImg.src = house;
      houseImage.src = houseImg.src;

      const pokeballImg = new Image();
      pokeballImg.onload = () => {
        setPokeballImageLoaded(true);
        assetsLoaded();
      };
      pokeballImg.src = pokeballIMG;
      pokeballImage.src = pokeballImg.src;

      const playerImg = new Image();
      playerImg.onload = () => {
        setPlayerImageLoaded(true);
        assetsLoaded();
      };
      playerImg.src = playerIMG;
      playerImage.src = playerImg.src;

      const handleKeyDown = (e) => {
        switch (e.key) {
          case "ArrowLeft":
            player.move("left");
            break;
          case "ArrowRight":
            player.move("right");
            break;
          case "ArrowUp":
            player.move("up");
            break;
          case "ArrowDown":
            player.move("down");
            break;
          default:
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [
    ctx,
    player,
    pokeball,
    terrainImage,
    houseImage,
    pokeballImage,
    playerImage,
  ]);

  useEffect(() => {
    const drawDot = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(terrainImage, 0, 0);
        ctx.drawImage(houseImage, 80, 60);

        board();
        ctx.drawImage(
          pokeballImage,
          pokeball.spritePosition * pokeball.spriteItemDistance,
          0,
          objectSizes,
          objectSizes,
          pokeball.x * objectSizes,
          pokeball.y * objectSizes,
          objectSizes,
          objectSizes
        );

        ctx.drawImage(
          playerImage,
          player.direction[player.currentDirection].x,
          player.direction[player.currentDirection].y,
          objectSizes - 2,
          objectSizes,
          player.x * objectSizes,
          player.y * objectSizes,
          objectSizes,
          objectSizes
        );
      }
    };

    drawDot();
  }, [
    ctx,
    player,
    pokeball,
    terrainImage,
    houseImage,
    pokeballImage,
    playerImage,
  ]);

  const board = () => {
    if (ctx) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(w - 100, h - 70, 100, 70);

      ctx.font = "18px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillText("You Found", w - 93, h - 45);

      ctx.font = "14px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillText(score + " poketballs", w - 85, h - 25);
    }
  };

  const checkCollision = (x, y) => {
    if (
      (x > 3 && x < 9 && y === 6) ||
      (x > 4 && x < 9 && (y === 5 || y === 4 || y === 3))
    ) {
      return true;
    }

    if (
      x < 1 ||
      x > 20 ||
      y < 2 ||
      y > 20 ||
      (y > 0 && y < 4 && (x === 20 || x === 19)) ||
      (y > 0 && y < 4 && (x === 2 || x === 3)) ||
      (y > 18 && (x === 2 || x === 3)) ||
      (x > 17 && (y === 19 || y === 20)) ||
      (x > 19 && (y === 17 || y === 18))
    ) {
      return true;
    }

    return false;
  };

  const update = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(terrainImage, 0, 0);
      ctx.drawImage(houseImage, 80, 60);

      board();

      ctx.drawImage(
        pokeballImage,
        pokeball.spritePosition * pokeball.spriteItemDistance,
        0,
        objectSizes,
        objectSizes,
        pokeball.x * objectSizes,
        pokeball.y * objectSizes,
        objectSizes,
        objectSizes
      );

      ctx.drawImage(
        playerImage,
        player.direction[player.currentDirection].x,
        player.direction[player.currentDirection].y,
        objectSizes - 2,
        objectSizes,
        player.x * objectSizes,
        player.y * objectSizes,
        objectSizes,
        objectSizes
      );
    }
  };

  const assetsLoaded = () => {
    if (
      terrainImageLoaded &&
      houseImageLoaded &&
      pokeballImageLoaded &&
      playerImageLoaded
    ) {
      pokeball.generatePosition();
      update();
    }
  };

  return (
    <canvas
      id="canvas"
      width="460"
      height="460"
      style={{ border: "1px solid black" }}
    />
  );
};

export default PokemonGame;
