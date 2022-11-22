const path = require('path');
const os = require('os');
const fs = require('fs');
// 계획
// 1. 사용자가 원하는 폴더의 이름을 받아온다.
// 2. 그 폴더 안에 video, captured, duplicated 폴더를 만든다
// 3. 폴더 안에 있는 파일들을 다 돌면서 해당하는 mp4 | mov, png | aae, IMG_123 (IMG_E1234)

// console.log(process.argv[2])
const folder = process.argv[2];
const workingDir = path.join(os.homedir(), "Pictures", folder);
if (!folder || !fs.existsSync(workingDir)) {
  console.error("please enter folder name in Pictures");
  return;
}

const videoDir = path.join(workingDir, "video")
const capturedDir = path.join(workingDir, "captured")
const duplicatedDir = path.join(workingDir, "duplicated")

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir)
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir)
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir)

fs.promises.readdir(workingDir)
  .then(processFiles)
  .catch(console.log)


function processFiles(files) {
  files.forEach(file => {
    const ext = path.extname(file);
    if (isVideoFile(ext)) {
      move(file, videoDir)
    }
    else if (isCapturedFile(ext)) {
      move(file, capturedDir)
    }
    else if (isDuplicatedFile(files, file)) {
      move(file, duplicatedDir)
    }
  })
}

function isVideoFile(ext) {
  return ext === '.mp4' || ext === '.mov';
}

function isCapturedFile(ext) {
  return ext === '.png' || ext === '.aae';
}

function isDuplicatedFile(files, file) {
  if (!file.startsWith("IMG_") || file.startsWith("IMG_E")) {
    return false;
  }
  const edited = `IMG_E${file.split("_")[1]}`;
  const found = files.find(f => f === edited)
  return !!found;
}

function move(file, targetDir) {
  console.log(`move ${file} to ${path.basename(targetDir)}`)
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file)
  fs.promises
    .rename(oldPath, newPath)
    .catch(console.log)
}