import * as Location from "expo-location";
import Geohash from "ngeohash";

export async function getGeoHash() {
  // Pide permisos
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Permiso para acceder a la ubicación denegado");
    return;
  }

  // Obtiene ubicación
  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  // Genera el geoHash
  const geoHash = Geohash.encode(latitude, longitude);
  console.log("GeoHash:", geoHash);
  return { geoPoint: geoHash, latitude, longitude };
}
