import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  img: string = 'https://i.pravatar.cc/150';

  public dbInstance: SQLiteObject;
  users: Array<any>;
  constructor(public platform: Platform, public sqlite: SQLite) {
    this.databaseConnection();
  }

  databaseConnection() {
    console.log('connection method started...');
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'users',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.dbInstance = db;
          db.executeSql(
            'CREATE TABLE IF NOT EXISTS users (name varchar(32), gender varchar(32), dob date, permanentAddress varchar(32), temporaryAddress varchar(32), skills varchar(32))',
            []
          )
            .then((res) => {
              console.log('Executed SQL', res);
              // alert(JSON.stringify(res));
            })
            .catch((error) => console.error(JSON.stringify(error)));
          console.log('Database connected');
        })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }

  public addItem(
    name,
    gender,
    dob,
    permanentAddress,
    temporaryAddress,
    skills
  ) {
    // validation
    // this.databaseConn();

    console.log(this.dbInstance);

    if (!name.length || !gender.length || !dob || !permanentAddress.length) {
      alert(
        name +
          ' ' +
          gender +
          ' ' +
          dob +
          ' ' +
          permanentAddress +
          ' ' +
          temporaryAddress +
          ' ' +
          skills +
          ' ' +
          'Provide all details'
      );
      return;
    }
    this.databaseConnection();
    this.dbInstance
      .executeSql(
        'INSERT INTO users (name, gender, dob, permanentAddress, temporaryAddress, skills) VALUES (?,?,?,?,?,?)',
        [name, gender, dob, permanentAddress, temporaryAddress, skills]
      )
      .then(
        () => {
          // alert('Success');
          console.log('Insert Query Executed');
          // this.getAllusers();
        },
        (e) => {
          // alert(JSON.stringify(e.err));
          console.log('error in sql');
        }
      );
  }

  getAllusers() {
    // return new Promise((resolve, reject) => {
    this.dbInstance.executeSql('SELECT * FROM users', []).then(
      (res) => {
        this.users = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.users.push(res.rows.item(i));
          }
          return this.users;
        }
      },
      (e) => {
        alert(JSON.stringify(e));
      }
    );
    // });
  }

  public dropDatabase() {
    this.dbInstance
      .executeSql('DROP TABLE users', [])
      .then(() => {
        console.log('deleted');
      })
      .catch((e) => {
        console.log(e);
      });
    this.databaseConnection();
  }

  setImg(imgName) {
    this.img = imgName;
  }

  getImg() {
    return this.img;
  }
}
