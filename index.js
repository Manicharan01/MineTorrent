"use strict";

import * as fs from "fs";
import bencode from "bencode";
import * as dgram from "dgram";
import Buffer from "buffer";
import * as urlmod from "url";

const torrent = bencode.decode(fs.readFileSync("puppy.torrent"));
const url = urlmod.parse(torrent.announce.toString("utf8"));
console.log(url);
const socket = dgram.createSocket("udp4");

const myMsg = Buffer.Buffer.from("hello?", "utf8");

socket.send(myMsg, 0, myMsg.length, 3000, "127.0.0.1", () => {});

socket.on("message", (msg) => {
  console.log("message is", msg);
});
