let models = [
  {
    title: 'Little Ninja',
    imageUrl: '/avatars/default.png',
    price: 0
  }
];

let generateNinjaModels = () => {
  var count = NinjaModel.find().count();
  if (count < models.length) {
    for (var i=count; i< models.length; i++) {
      NinjaModel.insert(models[i]);
    }
  }
};


Modules.server.generateNinjaModels = generateNinjaModels;
