import { join } from "path";

import { app, BrowserWindow } from "electron";
import is_dev from "electron-is-dev";
import dotenv from "dotenv";

dotenv.config({ path: join(__dirname, "../../.env") });

let win: BrowserWindow;

function createWin() {
  win = new BrowserWindow({
    width: 1280,
    height: 768,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: join(__dirname, "../preload/index.js"),
    },
  });

  const URL = is_dev
    ? `http://localhost:${process.env.PORT}`
    : `file://${join(__dirname, "../render/index.html")}`;

  win?.loadURL(URL);
  win?.webContents.openDevTools({ mode: "right" });
}

app.whenReady().then(createWin);
