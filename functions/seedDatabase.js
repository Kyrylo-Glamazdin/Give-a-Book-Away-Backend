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
            title: "Book 1", author: "Author 1", isbn: "1234", preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkB1qK13I9DeSy79dXGjGJC5UoMbCym9ioYg&usqp=CAU"
        }),
        Book.create({
            title: "Book 2", author: "Author 2", isbn: "1235", preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTioiWoj41EsWNdtWg-9SXkOigp0PNYREKfNA&usqp=CAU"
        }),
        Book.create({
            title: "Book 3", author: "Author 3", isbn: "1236", preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMzIsRW3aVyq3JKEkGST6ogEe09honlpfZQ&usqp=CAU"
        }),
        Book.create({
            title: "Book 4", author: "Author 4", isbn: "1237", preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21hq6ljHHF1hnaxsYWrut5KqlRmeb4gVtJw&usqp=CAU"
        }),
        Book.create({
            title: "Book 5", author: "Author 1", isbn: "1238", preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU"
        }),
        Book.create({
            title: "Book 6", author: "Author 2", isbn: "1239", preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU"
        }),
        Book.create({
            title: "Book 7", author: "Author 6", isbn: "1232", preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU"
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