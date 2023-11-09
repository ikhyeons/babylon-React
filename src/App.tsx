import { useState, useCallback } from "react";
import {
  HemisphericLight,
  ArcRotateCamera,
  MeshBuilder,
  Vector3,
  Scene,
  Mesh,
} from "@babylonjs/core";
import SceneComponent from "./components/SceneComponent";

export default function App() {
  const [state, setState] = useState(0);

  let box: Mesh;

  const onSceneReady = useCallback((scene: Scene) => {
    const camera = new ArcRotateCamera(
      "camera1",
      (3 * Math.PI) / 2,
      Math.PI / 50,
      550 * 0.015,
      Vector3.Zero(),
      scene
    );
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.position.y = 2;
    MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  }, []);

  const onRender = useCallback((scene: Scene) => {
    if (box !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          setState((prev) => prev + 1);
        }}
      >
        gd
      </button>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
      />
    </div>
  );
}
