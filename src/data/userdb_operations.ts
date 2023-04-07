import { Database } from "./db";

interface User {
    name: string;
    totaal: number;
    dag: number;
}

interface DB {
    users: User[]
}

const initial: DB = {
    users: []
}

const db = new Database<DB>('./src/data/data.json', initial)

export function getLastAanwezigheidUsername(username: string) {
    if (findUsername(username)) {
        var User = getUsername(username)
        if (typeof User == 'string') {
            return "User not found"
        }
        else {
            return User.dag
        }
    }
    return "User not found"
}

export function getUsername(username: string) {
    if (findUsername(username)) {
        for (var i in db.data.users) {
            if (db.data.users[i].name == username) {
                return db.data.users[i]
            }
        }
        return "User not found"
    }
    return "User not found"
}

export function findUsername(username: string) {
    for (var i in db.data.users) {
        if (db.data.users[i].name == username) {
            return true
        }
    }
    return false
}

export function getUsernames() {
    return db.data.users
}

export function addAanwezigheidUsername(username: string, dag: number) {
    console.log("addAanwezigheidUsername")
    var user = getUsername(username)

    if (db.data.users[0] == undefined) {
        db.update({
            users: [{
                name: username,
                totaal: 1,
                dag: dag
            }]
        });
    }
    else {
        if (typeof user == 'string') {
            var persoon = {
                name: username,
                totaal: 1,
                dag: dag
            }
            db.data.users.push(persoon)
        }
        else {
            user.totaal += 1
            user.dag = dag
        }
        db.update({
            users: db.data.users
        })
    }

    db.commit()
}