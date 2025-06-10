import mongodb from "mongodb";

const mongoClient = mongodb.MongoClient;

let _db = undefined;

export const mongoConnect = (callback) => {
  mongoClient
    .connect(
      "mongodb+srv://navratilmilann:XwuSFq3KLQgRjQvs@nodejs-course.t5lqqq6.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS-course"
    )
    .then((client) => {
      callback();

      _db = client.db();

      console.log("Connected!");
    })
    .catch((exception) => console.log(exception));
};

export const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No database";
};
