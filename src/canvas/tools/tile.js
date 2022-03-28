export function getTilePos({ scene, cursor }) {
  const pos = scene.camera.toInnerCoordinate(cursor);
  return {
    x: Math.round(pos.x / scene.tileMap.size),
    y: Math.round(pos.y / scene.tileMap.size),
  };
}

export function draw({ scene, cursor, tile }) {
  scene.tileMap.draw(getTilePos({ scene, cursor }), tile);
}

export function erase({ scene, cursor }) {
  scene.tileMap.erase(getTilePos({ scene, cursor }));
}
