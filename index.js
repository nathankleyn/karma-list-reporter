var ListReporter = function(baseReporterDecorator, formatError, runSlow) {
  baseReporterDecorator(this, formatError, runSlow);

  var onSpecCompleteOriginal = this.onSpecComplete;

  this.onSpecComplete = function(browser, result) {
    var status;

    if (result.success) {
      status = 'success';
    }
    else if (result.skipped) {
      status = 'skipped';
    }
    else {
      status = 'failure';
    }

    this.writeCommonMsg(result.description + ': ' + status);

    onSpecCompleteOriginal.call(this, browser, result);
  };
};

ListReporter.$inject = ['baseReporterDecorator', 'formatError', 'runSlow'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:listy': ['type', ListReporter]
};
