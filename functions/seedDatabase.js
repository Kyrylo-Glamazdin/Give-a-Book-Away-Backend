const {Book, User} = require('../db/models');

const seedDatabase = async() => {
    console.log("Seeding database");
    const users = await Promise.all([
        User.create({
            name: "User 1", username: "user_1", zipcode: "11204"
        }),
        User.create({
            name: "User 2", username: "user_2", zipcode: "10012"
        }),
        User.create({
            name: "User 3", username: "user_3", zipcode: "10021"
        }),
        User.create({
            name: "User 4", username: "user_4", zipcode: "11364"
        }),
        User.create({
            name: "User 5", username: "user_5", zipcode: "11370"
        }),
        User.create({
            name: "User 6", username: "user_6", zipcode: "11229"
        })
    ]);

    console.log("Users seeded");

    const books = await Promise.all([
        Book.create({
            title: "JavaScript: The Good Parts", author: "Douglas Crockford", isbn: "9780596554873", preview_image: "http://books.google.com/books/content?id=PXa2bby0oQ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }),
        Book.create({
            title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9789390287154", preview_image: "http://books.google.com/books/content?id=zWvuDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }),
        Book.create({
            title: "Hamlet", author: "William Shakespeare", isbn: "1555763332", preview_image: "http://books.google.com/books/content?id=GxTWsfd82SwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }),
        Book.create({
            title: "Hamlet", author: "William Shakespeare", isbn: "1555763332", preview_image: "http://books.google.com/books/content?id=GxTWsfd82SwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }),
        Book.create({
            title: "JavaScript: The Good Parts", author: "Douglas Crockford", isbn: "9780596554873", preview_image: "http://books.google.com/books/content?id=PXa2bby0oQ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }),
        Book.create({
            title: "The Book Thief", author: "Markus Zusak", isbn: "9781473541870", preview_image: "http://books.google.com/books/content?id=FNF1CwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        }),
        Book.create({
            title: "Crime and Punishment", author: "Fyodor Dostoevsky", isbn: "9781473382886", preview_image: "http://books.google.com/books/content?id=bBl5CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        })
    ])

    console.log("Books seeded");

    await books[0].setUser(users[0]);
    await books[1].setUser(users[4]);
    await books[2].setUser(users[5]);
    await books[3].setUser(users[1]);
    await books[4].setUser(users[1]);
    await books[5].setUser(users[2]);
    await books[6].setUser(users[5]);
}

module.exports = seedDatabase;