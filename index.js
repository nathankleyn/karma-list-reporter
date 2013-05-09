var ListReporter,
    MESSAGE = '%s: %s\r\n'
    util = require('util');

ListReporter = function(baseReporterDecorator, formatError) {
  baseReporterDecorator(this, formatError);

  var onSpecCompleteOriginal = this.onSpecComplete;

  this.onSpecComplete = function(browser, result) {
    var status,
        specName = result.suite.join(' ') + ' ' + result.description;;

    if (result.success) {
      status = 'SUCCESS';
    }
    else if (result.skipped) {
      status = 'SKIPPED';
    }
    else {
      status = 'FAILURE';
    }

    this.writeCommonMsg(util.format(MESSAGE, status, specName));

    onSpecCompleteOriginal.call(this, browser, result);
  };
};

ListReporter.$inject = ['baseReporterDecorator', 'formatError'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:list': ['type', ListReporter]
};
