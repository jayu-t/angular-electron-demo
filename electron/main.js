const {
  app,
  BrowserWindow,
  desktopCapturer,
  ipcMain,
  dialog,
  netLog,
} = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");
const ping = require("ping");

let win;

async function onReady() {
  netLog.startLogging(path.join(__dirname, "/../logs/netlog.log"));
  win = new BrowserWindow({
    width: 900,
    height: 6700,
    webPreferences: {
      //   preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        "/../dist/angular-electron-demo/index.html"
      ),
      protocol: "file:",
      slashes: true,
    })
  );

  //   await netLog.startLogging(path.join(__dirname, "/../logs/netlog.log"));
}

app.on("ready", onReady);
app.on("quit", () => {
  netLog.stopLogging();
  app.quit();
});

ipcMain.on("capture-screenshot", () => {
  takeScreenShot();
});

ipcMain.on("ping-google", () => {
  // Refer: https://www.npmjs.com/package/ping#promise-wrapper
  ping.promise.probe("www.google.com").then(function (res) {
    console.log(res);

    console.log("Currently Logging - ", netLog.currentlyLogging);

    win.webContents.send("ping-google-end");
  });
});

ipcMain.on("ping-facebook", () => {
  // Refer: https://www.npmjs.com/package/ping#promise-wrapper
  ping.promise.probe("www.facebook.com").then(function (res) {
    console.log(res);

    console.log("Currently Logging - ", netLog.currentlyLogging);

    win.webContents.send("ping-facebook-end");
  });
});

const takeScreenShot = () => {
  let win = BrowserWindow.getFocusedWindow();
  win.webContents
    .capturePage({
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    })
    .then((img) => {
      dialog
        .showSaveDialog({
          title: "Select the File Path to save",

          // Default path to assets folder
          defaultPath: path.join(__dirname, "../screenshots/image.png"),

          // defaultPath: path.join(__dirname,
          // '../assets/image.jpeg'),
          buttonLabel: "Save",

          // Restricting the user to only Image Files.
          filters: [
            {
              name: "Image Files",
              extensions: ["png", "jpeg", "jpg"],
            },
          ],
          properties: [],
        })
        .then((file) => {
          // Stating whether dialog operation was
          // cancelled or not.
          console.log(file.canceled);
          if (!file.canceled) {
            console.log(file.filePath.toString());

            // Creating and Writing to the image.png file
            // Can save the File as a jpeg file as well,
            // by simply using img.toJPEG(100);
            fs.writeFile(
              file.filePath.toString(),
              img.toPNG(),
              "base64",
              function (err) {
                if (err) throw err;
                console.log("Saved!");
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// const netlogPath = path.join(__dirname, "/../logs/netlog.log");

// export default netlogPath;
