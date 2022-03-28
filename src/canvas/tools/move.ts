export function pan({ scene, cursor, prevCursor }) {
  scene.camera.pan({
    x: cursor.x - prevCursor.x,
    y: cursor.y - prevCursor.y,
  });
}

export function zoom({ scene, delta, cursor }) {
  scene.camera.zoom(delta, cursor);
}
