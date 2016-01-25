let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateNinjaModels();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {};

var _generateNinjaModels = () => Modules.server.generateNinjaModels();

Modules.server.startup = startup;
