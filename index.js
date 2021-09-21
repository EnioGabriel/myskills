/**
 * Indica qual interface irá abrir primeiro
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// Setando a primeira pagina
AppRegistry.registerComponent(appName, () => App);
