/**
 * Player account definition
 */
interface UGAccount {
  id: number,
  username: string,
  password: string,
  admin: number,
  position: string,
}

/**
 * Custom PlayerMp definition
 */
interface UGPlayerMp extends PlayerMp {
  account: UGAccount,
  logged: Boolean,
  spawnedVehicles: Array<VehicleMp>,
  respawnTimer: NodeJS.Timeout,

  exists(): Promise<{}>;
  login(username: string, password: string): Promise<{}>;
  register(username: string, password: string): Promise<{}>;
  save(): Promise<{}>;
  handleLogin(account: UGAccount): void;
}