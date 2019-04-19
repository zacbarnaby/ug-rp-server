mp.events.add('joinScenary', (state: boolean) => {
  const scenaryCamera = mp.cameras.new('camera', new mp.Vector3(-407.5501708984375, 553.7418212890625, 225.0052490234375), new mp.Vector3(0, 0, 0), 40);
  scenaryCamera.pointAtCoord(-129.85623168945312, -464.7018127441406, 119.3843994140625);
  scenaryCamera.setActive(state);
  mp.game.cam.renderScriptCams(state, false, 0, true, false);
  
  if (!state) {
    scenaryCamera.destroy();
  }
});
