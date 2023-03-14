import {faker} from '@faker-js/faker';

//Generates random user data
export const randomUserData = () => {
    const userData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        bio: faker.lorem.sentence(),
    }
    return userData;
}