class AppController {
  constructor(appService) {
    this.appService = appService;
  }

  getHello(req, res) {
    res.send(this.appService.getHello());
  }
}

module.exports = { AppController };
