const express = require('express');

const app = express();

app.use(express.static('./dist/angular-video-library'));

app.get('/*', function (req, res) {
  res.sendFile(process.cwd() + '/dist/angular-video-library/index.html')
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)