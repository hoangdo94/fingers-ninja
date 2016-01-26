TabularTables = {};

TabularTables.Leaderboard = new Tabular.Table({
  name: "Leaderboard",
  collection: GameProfile,
  order: [
    [5, "desc"]
  ],
  columns: [{
    data: "userId",
    title: "#",
    sortable: false,
    class: "hidden"
  }, {
    data: "wordsCompleted",
    title: "#",
    sortable: false,
    class: "hidden"
  }, {
    data: "wordsMissed",
    title: "#",
    sortable: false,
    class: "hidden"
  }, {
    data: "nickname",
    title: "Nickname",
    render: (val, type, doc) => {
      return '<a href="/user/' + doc.userId + '">' + val + '</a>';
    }
  }, {
    data: "currentModel",
    title: "Class",
    render: (val) => NinjaModel.findOne(val).title || 'Unknown'
  }, {
    data: "points",
    title: "Points",
    order: true
  }, {
    data: 'accuracy()',
    title: "Accuracy",
    render: (val, type, doc) => {
      return Math.round(val * 10000)/100 + ' %';
    }
  }, {
    data: 'wpm()',
    title: "Words per Minute"
  }, {
    data: 'timePlayed',
    title: "Play duration",
    render: (val) => moment.duration(val, 'seconds').humanize()
  }]
});
